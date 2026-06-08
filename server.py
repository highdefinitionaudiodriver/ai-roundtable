from __future__ import annotations

import json
import os
import pathlib
import re
import secrets
import sys
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


ROOT = pathlib.Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
HOST = "127.0.0.1"
PORT = int(os.environ.get("AI_ROUNDTABLE_PORT", "8787"))
ALLOWED_ORIGIN = f"http://{HOST}:{PORT}"
CSRF_TOKEN = secrets.token_urlsafe(32)


SYSTEM_PROMPT = """You are one participant in an AI roundtable.
Respond in the user's language unless a different language is requested.
Be concise, concrete, and honest about uncertainty.
If the topic is medical, legal, financial, safety-critical, or otherwise high stakes, add careful caveats and suggest professional verification.
Do not provide instructions that facilitate self-harm, illegal activity, weapons, fraud, or harm to others.
For medical, legal, financial, employment, education, housing, immigration, or government-service topics, do not give individualized final advice; only identify issues, uncertainty, and questions for qualified human review.
Do not claim to have consulted other AIs; analyze only the provided text and context."""


ROLE_PROMPTS = {
    "reviewer": "Review the other AI's answer. Identify accurate points, likely mistakes, missing context, and practical improvements.",
    "skeptic": "Challenge the answer. Look for hidden assumptions, counterexamples, risks, and places where the answer could mislead the user.",
    "expander": "Add useful context. Provide alternative perspectives, better examples, and next-step questions the user should consider.",
    "synthesizer": "Synthesize the discussion. Give a balanced conclusion, explain what seems most reliable, and list remaining uncertainties.",
    "moderator": "Keep the discussion productive. Identify the strongest unresolved issue and invite the next useful line of reasoning.",
}


BLOCKED_PATTERNS = [
    ("self-harm", re.compile(r"自殺|自死|死にたい|消えたい|首を吊|飛び降り|リストカット|overdose|suicide|self[- ]?harm|kill myself", re.I)),
    ("illegal activity", re.compile(r"詐欺|フィッシング|なりすまし|不正アクセス|マルウェア|違法薬物|犯罪|phishing|malware|fraud|scam|illegal drug|hack into", re.I)),
    ("weapons", re.compile(r"爆弾|銃|武器|bomb|weapon", re.I)),
    ("violence", re.compile(r"殺し方|傷つける方法|脅迫文|テロ|how to kill|hurt someone|terrorism|violent threat", re.I)),
    ("sensitive data", re.compile(r"個人情報|住所|電話番号|マイナンバー|パスワード|api[_ -]?key|秘密鍵|機密|personal data|password|secret key|confidential", re.I)),
]


class SafetyBlockedError(Exception):
    def __init__(self, labels: list[str]):
        self.labels = labels
        super().__init__("Request blocked for safety reasons.")


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC), **kwargs)

    def end_headers(self) -> None:
        origin = self.headers.get("Origin")
        if origin == ALLOWED_ORIGIN:
            self.send_header("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
            self.send_header("Vary", "Origin")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        if not self.is_allowed_origin():
            self.send_error(403)
            return
        self.send_response(204)
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/providers":
            self.write_json({"providers": provider_key_status()})
            return
        if self.path == "/api/csrf":
            self.write_json({"csrfToken": CSRF_TOKEN})
            return
        super().do_GET()

    def do_POST(self) -> None:
        if self.path not in ("/api/roundtable", "/api/roundtable-step"):
            self.send_error(404)
            return
        if not self.is_allowed_origin() or self.headers.get("X-CSRF-Token") != CSRF_TOKEN:
            self.write_json({"error": "Forbidden."}, status=403)
            return

        try:
            payload = self.read_json()
            enforce_server_safety(payload)
            result = run_roundtable_step(payload) if self.path == "/api/roundtable-step" else run_roundtable(payload)
            self.write_json(result)
        except SafetyBlockedError as exc:
            self.write_json({"error": "Blocked for safety reasons.", "blocked": exc.labels}, status=400)
        except Exception as exc:
            detail = str(exc)
            if "API_KEY is not set" in detail:
                self.write_json({"error": detail}, status=500)
            else:
                self.write_json({"error": "Request failed."}, status=500)

    def is_allowed_origin(self) -> bool:
        origin = self.headers.get("Origin")
        if not origin:
            return True
        return origin == ALLOWED_ORIGIN

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8")
        return json.loads(raw or "{}")

    def write_json(self, data: dict, status: int = 200) -> None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def run_roundtable(payload: dict) -> dict:
    question = str(payload.get("question", "")).strip()
    source_answer = str(payload.get("sourceAnswer", "")).strip()
    mode = str(payload.get("mode", "balanced"))
    provider = str(payload.get("provider", "openai"))

    if not source_answer:
        raise ValueError("Source answer is required.")

    transcript: list[dict] = []
    prior = ""
    for role in ("reviewer", "skeptic", "expander", "synthesizer"):
        user_prompt = build_role_prompt(role, question, source_answer, prior, mode)
        text = call_provider(provider, user_prompt)
        entry = {"role": role, "text": text}
        transcript.append(entry)
        prior += f"\n\n[{role}]\n{text}"

    return {"transcript": transcript}


def run_roundtable_step(payload: dict) -> dict:
    question = str(payload.get("question", "")).strip()
    source_answer = str(payload.get("sourceAnswer", "")).strip()
    mode = str(payload.get("mode", "balanced"))
    provider = str(payload.get("provider", "openai"))
    role = str(payload.get("role", "reviewer"))
    prior = transcript_to_text(payload.get("transcript", []))

    if not source_answer:
        raise ValueError("Source answer is required.")
    if role not in ROLE_PROMPTS:
        raise ValueError(f"Unknown role: {role}")

    user_prompt = build_role_prompt(role, question, source_answer, prior, mode)
    text = call_provider(provider, user_prompt)
    return {"entry": {"role": role, "text": text}}


def transcript_to_text(transcript: object) -> str:
    if not isinstance(transcript, list):
        return ""
    lines = []
    for item in transcript:
        if not isinstance(item, dict):
            continue
        role = str(item.get("role", "participant"))
        text = str(item.get("text", "")).strip()
        if text:
            lines.append(f"[{role}]\n{text}")
    return "\n\n".join(lines)


def enforce_server_safety(payload: dict) -> None:
    question = str(payload.get("question", ""))
    source_answer = str(payload.get("sourceAnswer", ""))
    text = f"{question}\n{source_answer}"
    labels = [label for label, pattern in BLOCKED_PATTERNS if pattern.search(text)]
    if labels:
        print(f"[safety-blocked] labels={','.join(labels)} chars={len(text)}", file=sys.stderr)
        raise SafetyBlockedError(labels)


def build_role_prompt(role: str, question: str, source_answer: str, prior: str, mode: str) -> str:
    footer = ""
    if role == "synthesizer":
        footer = "\nAdd a final note that this is a role-based analysis from the selected provider/model, not independent verification by multiple separate AI systems."
    return f"""{ROLE_PROMPTS[role]}
Do not give final professional advice. For high-stakes topics, keep the output to issue spotting, uncertainty, and questions for qualified human review.

Mode: {mode}

Original user request:
{question or "(not provided)"}

Answer from the first AI:
{source_answer}

Roundtable so far:
{prior or "(none yet)"}

Your response:{footer}"""


# OpenAI Chat Completions 互換のプロバイダ群。
# いずれも同じリクエスト/レスポンス形式なので汎用呼び出しで処理する。
# 個別実装が必要な anthropic / gemini はこの辞書には含めない。
OPENAI_COMPATIBLE = {
    "openai": {
        "label": "OpenAI (ChatGPT)",
        "url": "https://api.openai.com/v1/chat/completions",
        "key_env": "OPENAI_API_KEY",
        "model_env": "OPENAI_MODEL",
        "default_model": "gpt-4o-mini",
    },
    "grok": {
        "label": "xAI Grok",
        "url": "https://api.x.ai/v1/chat/completions",
        "key_env": "XAI_API_KEY",
        "model_env": "XAI_MODEL",
        "default_model": "grok-2-latest",
    },
    "groq": {
        "label": "Groq",
        "url": "https://api.groq.com/openai/v1/chat/completions",
        "key_env": "GROQ_API_KEY",
        "model_env": "GROQ_MODEL",
        "default_model": "llama-3.3-70b-versatile",
    },
    "mistral": {
        "label": "Mistral",
        "url": "https://api.mistral.ai/v1/chat/completions",
        "key_env": "MISTRAL_API_KEY",
        "model_env": "MISTRAL_MODEL",
        "default_model": "mistral-large-latest",
    },
    "deepseek": {
        "label": "DeepSeek",
        "url": "https://api.deepseek.com/chat/completions",
        "key_env": "DEEPSEEK_API_KEY",
        "model_env": "DEEPSEEK_MODEL",
        "default_model": "deepseek-chat",
    },
    "perplexity": {
        "label": "Perplexity",
        "url": "https://api.perplexity.ai/chat/completions",
        "key_env": "PERPLEXITY_API_KEY",
        "model_env": "PERPLEXITY_MODEL",
        "default_model": "sonar",
    },
}

# 個別実装プロバイダのキー環境変数（/api/providers の可用性表示に使用）
SPECIAL_PROVIDERS = {
    "anthropic": {"label": "Anthropic (Claude)", "key_env": "ANTHROPIC_API_KEY"},
    "gemini": {"label": "Google Gemini", "key_env": "GEMINI_API_KEY"},
}


def provider_key_status() -> dict[str, bool]:
    """各プロバイダについて、対応する API キーが設定済みかを返す。"""
    status: dict[str, bool] = {}
    for name, cfg in OPENAI_COMPATIBLE.items():
        status[name] = bool(os.environ.get(cfg["key_env"]))
    for name, cfg in SPECIAL_PROVIDERS.items():
        status[name] = bool(os.environ.get(cfg["key_env"]))
    return status


def call_provider(provider: str, prompt: str) -> str:
    if provider == "anthropic":
        return call_anthropic(prompt)
    if provider == "gemini":
        return call_gemini(prompt)
    if provider in OPENAI_COMPATIBLE:
        return call_openai_compatible(provider, prompt)
    # 未知のプロバイダは OpenAI にフォールバック
    return call_openai_compatible("openai", prompt)


def post_json(url: str, headers: dict, body: dict) -> dict:
    data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Provider request failed: {exc.code} {detail}") from exc


def call_openai_compatible(provider: str, prompt: str) -> str:
    """OpenAI Chat Completions 互換 API を呼び出す汎用関数。"""
    cfg = OPENAI_COMPATIBLE[provider]
    key = os.environ.get(cfg["key_env"])
    if not key:
        raise RuntimeError(
            f"{cfg['key_env']} is not set. Use copy/open buttons instead, or set an API key."
        )
    max_tokens_env = cfg["key_env"].replace("_API_KEY", "_MAX_TOKENS")
    data = post_json(
        cfg["url"],
        {"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        {
            "model": os.environ.get(cfg["model_env"], cfg["default_model"]),
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.4,
            "max_tokens": int(os.environ.get(max_tokens_env, "1000")),
        },
    )
    return data["choices"][0]["message"]["content"].strip()


def call_openai(prompt: str) -> str:
    """後方互換用エイリアス（旧名）。"""
    return call_openai_compatible("openai", prompt)


def call_anthropic(prompt: str) -> str:
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        raise RuntimeError("ANTHROPIC_API_KEY is not set. Use copy/open buttons instead, or set an API key.")
    data = post_json(
        "https://api.anthropic.com/v1/messages",
        {
            "x-api-key": key,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
        },
        {
            "model": os.environ.get("ANTHROPIC_MODEL", "claude-3-5-haiku-latest"),
            "system": SYSTEM_PROMPT,
            "max_tokens": int(os.environ.get("ANTHROPIC_MAX_TOKENS", "1000")),
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    return "".join(block.get("text", "") for block in data.get("content", [])).strip()


def call_gemini(prompt: str) -> str:
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not set. Use copy/open buttons instead, or set an API key.")
    model = os.environ.get("GEMINI_MODEL", "gemini-1.5-flash")
    data = post_json(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}",
        {"Content-Type": "application/json"},
        {
            "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": int(os.environ.get("GEMINI_MAX_OUTPUT_TOKENS", "1000")),
            },
            "safetySettings": [
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_LOW_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_LOW_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_LOW_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_LOW_AND_ABOVE"},
            ],
        },
    )
    return data["candidates"][0]["content"]["parts"][0]["text"].strip()


def main() -> None:
    os.chdir(PUBLIC)
    server = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"AI Roundtable running at http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping.")
        sys.exit(0)


if __name__ == "__main__":
    main()
