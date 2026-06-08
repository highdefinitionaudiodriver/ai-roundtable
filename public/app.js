const translations = {
  ja: {
    eyebrow: "AI回答を、他のAIの検討会へ",
    language: "表示言語",
    sourceTitle: "元のAI回答",
    questionLabel: "元の質問・相談",
    questionPlaceholder: "例: この契約書のリスクを教えて",
    answerLabel: "このAIに言われた内容",
    answerPlaceholder: "別のAIからの回答をここに貼り付け",
    mode: "議論モード",
    provider: "実行AI",
    balanced: "バランス",
    strict: "厳しめレビュー",
    creative: "別視点多め",
    expert: "専門家風",
    runRoundtable: "検討会を実行",
    startAuto: "自動議論を開始",
    stopAuto: "停止",
    autoCostNote: "自動議論は最大10ターンまたは10分で自動停止します。費用や利用上限に注意してください。",
    modelNoticeTitle: "透明性メモ",
    modelNoticeBody: "アプリ内実行では、選択した同一AIが複数の視点を演じます。別社AIによる独立検証ではありません。",
    importNoticeTitle: "外部取り込み",
    importNoticeBody: "この内容はURLまたは共有メニューから取り込まれました。実行前に本文と送信先を確認してください。",
    riskTitle: "高リスク領域の可能性があります",
    riskMessage: "この内容は、AIの回答を最終判断に使うと危険な領域を含む可能性があります。AI Roundtableは論点整理と比較検討のためのツールです。",
    providerNotice: "送信先プロバイダ",
    blockedMessage: "この内容は安全上の理由により実行できません。自傷、違法行為、武器、詐欺、または他者に危害を与える支援には使えません。",
    selfHarmBlockedSupport: "ただし、つらさや危険が差し迫っている場合は、このアプリではなく、今すぐ身近な人・医療機関・地域の緊急窓口へ相談してください。日本ではよりそいホットライン 0120-279-338、いのちの電話 0120-783-556 などがあります。",
    autoRiskMessage: "高リスク領域では自動議論が過度に断定的な内容を増幅する可能性があります。続行する場合も、必ず人間の確認を前提にしてください。",
    riskConfirm: "AIの出力を最終判断に使わず、必要に応じて有資格者・責任ある人間に確認します。",
    cancel: "キャンセル",
    continueAnyway: "理解して続行",
    blockedStatus: "安全上の理由により実行を停止しました。",
    copyPrompt: "共有プロンプトをコピー",
    quickTitle: "ワンクリック共有",
    installTitle: "スマホアプリ化",
    installBody: "ホーム画面に追加すると、アプリのようにすぐ起動できます。",
    installButton: "ホーム画面に追加",
    installHint: "iPhoneは共有ボタンから「ホーム画面に追加」を選んでください。",
    bookmarkletTitle: "選択テキスト取り込み",
    bookmarkletBody: "他のAI画面で回答文を選択して、このブックマークレットを押すと取り込めます。",
    copyBookmarklet: "ブックマークレットをコピー",
    discussion: "AI同士の意見交換",
    copyDiscussion: "議論をコピー",
    empty: "まだ議論はありません。元のAI回答を入れて実行するか、共有プロンプトをコピーしてください。",
    copied: "コピーしました。",
    running: "AI検討会を実行中です...",
    autoRunning: "自動議論中です。停止ボタンを押すまで継続します...",
    autoLimitReached: "自動議論は安全上限に達したため停止しました。",
    autoStopped: "自動議論を停止しました。",
    missing: "元のAI回答を入力してください。",
    pasteFail: "クリップボードを読めませんでした。手動で貼り付けてください。",
    noApi: "APIキーが未設定の場合は、右側の共有ボタンかプロンプトコピーを使えます。",
    apiHelpLead: "💡 アプリ内で AI を実行するには、その提供元の API キーが必要です。",
    apiHelpSub: "API キーが無くても、右の「ワンクリック共有」で各 AI を開いたり、プロンプトをコピーして使えます（無料）。",
    apiHelpHow: "API キーの設定方法",
    apiHelpHowBody: "サーバ起動前に環境変数でキーを設定してください（例）:",
    apiHelpEnv: "詳細は同梱の .env.example を参照してください。",
    providerReady: "✓ {name} の API キーは設定済みです。すぐ実行できます。",
    providerMissing: "⚠ {name} の API キーが未設定です。このまま実行するとエラーになります。共有/コピーをご利用ください。",
    optionKeySet: "（キー設定済み）",
    optionKeyMissing: "（キー未設定）",
    appReady: "スマホにインストールできる状態です。",
    appInstalled: "ホーム画面に追加しました。",
    reviewer: "レビュアー",
    skeptic: "反論役",
    expander: "補足役",
    synthesizer: "統合役",
    moderator: "進行役",
  },
  en: {
    eyebrow: "Send an AI answer to other AIs for review",
    language: "Language",
    sourceTitle: "Original AI Answer",
    questionLabel: "Original question",
    questionPlaceholder: "Example: What are the risks in this contract?",
    answerLabel: "What the AI told you",
    answerPlaceholder: "Paste the other AI's answer here",
    mode: "Debate mode",
    provider: "Run with",
    balanced: "Balanced",
    strict: "Strict review",
    creative: "More perspectives",
    expert: "Expert style",
    runRoundtable: "Run roundtable",
    startAuto: "Start auto debate",
    stopAuto: "Stop",
    autoCostNote: "Auto debate stops after 10 turns or 10 minutes. Watch your costs and rate limits.",
    modelNoticeTitle: "Transparency note",
    modelNoticeBody: "In-app runs use the selected provider/model to role-play multiple perspectives. This is not independent verification by separate AI systems.",
    importNoticeTitle: "External import",
    importNoticeBody: "This content was imported from a URL or share target. Review the text and destination provider before running.",
    riskTitle: "This may be a high-risk topic",
    riskMessage: "This content may involve an area where using AI output as a final decision could be unsafe. AI Roundtable is for issue spotting, comparison, and critique.",
    providerNotice: "Destination provider",
    blockedMessage: "This content cannot be processed for safety reasons. Do not use this app to support self-harm, illegal activity, weapons, fraud, or harm to others.",
    selfHarmBlockedSupport: "If you are in immediate distress or danger, do not use this app to decide what to do. Contact someone you trust, local emergency services, or a crisis hotline. In the U.S. and Canada, call or text 988.",
    autoRiskMessage: "For high-risk topics, auto debate may amplify overconfident claims. Continue only if qualified human review remains the final checkpoint.",
    riskConfirm: "I will not use AI output as the final decision and will seek qualified or responsible human review when needed.",
    cancel: "Cancel",
    continueAnyway: "Understand and continue",
    blockedStatus: "Stopped for safety reasons.",
    copyPrompt: "Copy share prompt",
    quickTitle: "One-click sharing",
    installTitle: "Install on phone",
    installBody: "Add it to your home screen so it opens like an app.",
    installButton: "Add to home screen",
    installHint: "On iPhone, use Share, then Add to Home Screen.",
    bookmarkletTitle: "Import selected text",
    bookmarkletBody: "Select an answer on another AI page, then click this bookmarklet to import it.",
    copyBookmarklet: "Copy bookmarklet",
    discussion: "AI Roundtable Discussion",
    copyDiscussion: "Copy discussion",
    empty: "No discussion yet. Add an AI answer and run the roundtable, or copy a share prompt.",
    copied: "Copied.",
    running: "Running the AI roundtable...",
    autoRunning: "Auto debate is running until you press Stop...",
    autoLimitReached: "Auto debate stopped at the safety limit.",
    autoStopped: "Auto debate stopped.",
    missing: "Please enter the original AI answer.",
    pasteFail: "Could not read the clipboard. Please paste manually.",
    noApi: "If API keys are not configured, use the share buttons or copy prompt.",
    apiHelpLead: "💡 Running an AI inside this app requires that provider's API key.",
    apiHelpSub: "No API key? You can still open each AI or copy the prompt from \"One-click share\" on the right (free).",
    apiHelpHow: "How to set an API key",
    apiHelpHowBody: "Set the key as an environment variable before starting the server (example):",
    apiHelpEnv: "See the bundled .env.example for details.",
    providerReady: "✓ {name} API key is configured. Ready to run.",
    providerMissing: "⚠ {name} API key is not set. Running now will error — use share/copy instead.",
    optionKeySet: "(key set)",
    optionKeyMissing: "(no key)",
    appReady: "Ready to install on your phone.",
    appInstalled: "Added to your home screen.",
    reviewer: "Reviewer",
    skeptic: "Skeptic",
    expander: "Context Builder",
    synthesizer: "Synthesizer",
    moderator: "Moderator",
  },
  zh: {},
  ko: {},
  es: {},
  fr: {},
};

translations.zh = { ...translations.en, language: "语言", runRoundtable: "运行圆桌讨论", copyPrompt: "复制共享提示", quickTitle: "一键共享" };
translations.ko = { ...translations.en, language: "언어", runRoundtable: "라운드테이블 실행", copyPrompt: "공유 프롬프트 복사", quickTitle: "원클릭 공유" };
translations.es = { ...translations.en, language: "Idioma", runRoundtable: "Ejecutar mesa redonda", copyPrompt: "Copiar prompt", quickTitle: "Compartir con un clic" };
translations.fr = { ...translations.en, language: "Langue", runRoundtable: "Lancer la table ronde", copyPrompt: "Copier le prompt", quickTitle: "Partage en un clic" };

const aiTargets = [
  ["ChatGPT", "https://chat.openai.com/"],
  ["Claude", "https://claude.ai/new"],
  ["Gemini", "https://gemini.google.com/app"],
  ["Perplexity", "https://www.perplexity.ai/"],
  ["Grok", "https://grok.com/"],
  ["Copilot", "https://copilot.microsoft.com/"],
];

const state = {
  lang: "ja",
  transcript: [],
  installPrompt: null,
  autoRunning: false,
  autoIndex: 0,
  csrfToken: "",
};

const autoRoles = ["reviewer", "skeptic", "expander", "moderator", "synthesizer"];
const AUTO_MAX_TURNS = 10;
const AUTO_MAX_MS = 10 * 60 * 1000;

const blockedRules = [
  { label: "self-harm", pattern: /(自殺|自死|死にたい|消えたい|首を吊|飛び降り|リストカット|overdose|suicide|self[- ]?harm|kill myself)/i },
  { label: "illegal activity", pattern: /(詐欺|フィッシング|なりすまし|不正アクセス|マルウェア|爆弾|銃|武器|違法薬物|犯罪|phishing|malware|bomb|weapon|fraud|scam|illegal drug|hack into)/i },
  { label: "violence", pattern: /(殺し方|傷つける方法|脅迫文|テロ|how to kill|hurt someone|terrorism|violent threat)/i },
  { label: "sensitive data", pattern: /(個人情報|住所|電話番号|マイナンバー|パスワード|api[_ -]?key|秘密鍵|機密|personal data|password|secret key|confidential)/i },
];

const highRiskRules = [
  { label: "mental-health support", pattern: /(つらい|苦しい|消えたい|生きるのがつらい|助けて|mental crisis|end my life|can't go on|unalive myself)/i },
  { label: "medical/health", pattern: /(医療|病院|診断|治療|薬|服薬|副作用|手術|妊娠|メンタル|うつ|medical|diagnosis|treatment|medicine|medication|surgery|pregnan|depression)/i },
  { label: "legal", pattern: /(法律|弁護士|契約書|訴訟|裁判|違法|権利|legal|lawyer|contract|lawsuit|court|liability)/i },
  { label: "financial", pattern: /(投資|株|融資|ローン|保険|税務|確定申告|借金|financial|investment|stock|loan|credit|insurance|tax)/i },
  { label: "employment/education/housing", pattern: /(採用|解雇|人事評価|入試|成績|住宅|賃貸|employment|hiring|firing|admission|grading|housing|tenant)/i },
  { label: "government/essential services", pattern: /(行政|給付金|生活保護|在留|移民|ビザ|government|benefits|immigration|visa|public service)/i },
];

const riskGuidance = {
  ja: {
    "mental-health support": "強いつらさがある場合は、このアプリで結論を出さず、身近な人・医療機関・地域の緊急窓口へ相談してください。日本ではよりそいホットライン 0120-279-338、いのちの電話 0120-783-556 などがあります。",
    "medical/health": "医療・服薬・妊娠・メンタルヘルスの判断は、医師・薬剤師・医療機関へ確認してください。AIは診断や治療方針の決定には使わないでください。",
    legal: "法律・契約・訴訟の判断は、弁護士など有資格者へ確認してください。AIは論点整理の補助に留めてください。",
    financial: "投資・税務・保険・融資の判断は、専門家または公式窓口へ確認してください。AIの出力だけで売買・申告・契約を決めないでください。",
    "employment/education/housing": "採用・解雇・成績・住宅など人の機会に関わる判断は、責任ある人間の確認と公正な手続きが必要です。",
    "government/essential services": "行政・在留・給付など生活基盤に関わる内容は、公式窓口や専門家へ確認してください。",
  },
  en: {
    "mental-health support": "If you are in distress, do not use this app to decide what to do. Contact someone you trust, local emergency services, or a crisis hotline. In the U.S. and Canada, call or text 988.",
    "medical/health": "For medical, medication, pregnancy, or mental-health decisions, consult a clinician, pharmacist, or medical service. Do not use AI as diagnosis or treatment direction.",
    legal: "For legal, contract, or litigation decisions, consult a qualified lawyer. Use AI only for issue spotting.",
    financial: "For investing, tax, insurance, loan, or credit decisions, consult a qualified professional or official source. Do not decide transactions from AI output alone.",
    "employment/education/housing": "Employment, education, and housing decisions affect people's opportunities and require responsible human review and fair processes.",
    "government/essential services": "For government benefits, immigration, visas, or essential services, verify with official sources or qualified professionals.",
  },
};

const $ = (id) => document.getElementById(id);

function detectLanguage() {
  const saved = localStorage.getItem("roundtable-language") || "auto";
  $("language").value = saved;
  const browserLang = navigator.language.slice(0, 2);
  state.lang = saved === "auto" ? (translations[browserLang] ? browserLang : "en") : saved;
}

function t(key) {
  return translations[state.lang]?.[key] || translations.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  renderTimeline();
}

function sourcePayload() {
  return {
    question: $("question").value.trim(),
    sourceAnswer: $("source-answer").value.trim(),
    mode: $("mode").value,
    provider: $("provider").value,
  };
}

function classifyRisk() {
  const payload = sourcePayload();
  const text = `${payload.question}\n${payload.sourceAnswer}`;
  const blocked = blockedRules.filter((rule) => rule.pattern.test(text)).map((rule) => rule.label);
  const high = highRiskRules.filter((rule) => rule.pattern.test(text)).map((rule) => rule.label);
  return { blocked, high };
}

function ensureSafeToProceed({ auto = false } = {}) {
  const risk = classifyRisk();
  if (risk.blocked.length) {
    const support = risk.blocked.includes("self-harm") ? ` ${t("selfHarmBlockedSupport")}` : "";
    setStatus(`${t("blockedStatus")} (${risk.blocked.join(", ")})${support}`, true);
    return Promise.resolve(false);
  }
  if (!risk.high.length) {
    return Promise.resolve(true);
  }
  return showRiskDialog(risk.high, auto);
}

function showRiskDialog(labels, auto) {
  return new Promise((resolve) => {
    const dialog = $("risk-dialog");
    const list = $("risk-list");
    const message = $("risk-message");
    const confirm = $("risk-confirm");
    const continueButton = $("risk-continue");
    const cancelButton = $("risk-cancel");

    const provider = $("provider").selectedOptions[0]?.textContent || $("provider").value;
    message.textContent = `${t("riskMessage")} ${t("providerNotice")}: ${provider}.${auto ? ` ${t("autoRiskMessage")}` : ""}`;
    list.innerHTML = "";
    labels.forEach((label) => {
      const item = document.createElement("li");
      const guidance = riskGuidance[state.lang]?.[label] || riskGuidance.en[label] || "";
      item.textContent = guidance ? `${label}: ${guidance}` : label;
      list.appendChild(item);
    });
    confirm.checked = false;
    continueButton.disabled = true;

    const cleanup = (result) => {
      confirm.removeEventListener("change", onCheck);
      continueButton.removeEventListener("click", onContinue);
      cancelButton.removeEventListener("click", onCancel);
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
      resolve(result);
    };
    const onCheck = () => {
      continueButton.disabled = !confirm.checked;
    };
    const onContinue = () => cleanup(true);
    const onCancel = () => cleanup(false);

    confirm.addEventListener("change", onCheck);
    continueButton.addEventListener("click", onContinue);
    cancelButton.addEventListener("click", onCancel);
    dialog.addEventListener("cancel", onCancel);
    dialog.showModal();
  });
}

function setBusy(isBusy) {
  $("roundtable-form").querySelectorAll("textarea, select, button").forEach((node) => {
    if (node.id !== "stop-button") node.disabled = isBusy;
  });
  $("stop-button").disabled = !state.autoRunning;
}

function buildMasterPrompt() {
  const payload = sourcePayload();
  return `You are an AI roundtable coordinator. Please respond in the same language as the user's text unless asked otherwise.

Task:
Review the following answer from another AI. Then provide:
1. Agree: points that seem correct
2. Concerns: mistakes, missing context, or risky assumptions
3. Alternative view: what another AI might say differently
4. Final recommendation: a balanced conclusion

Debate mode: ${payload.mode}

Original user question:
${payload.question || "(not provided)"}

Answer from the first AI:
${payload.sourceAnswer || "(paste answer here)"}`;
}

function apiHeaders() {
  return {
    "Content-Type": "application/json",
    "X-CSRF-Token": state.csrfToken,
  };
}

function bookmarkletCode() {
  const base = `${location.origin}${location.pathname}`;
  return `javascript:(()=>{const s=String(getSelection());const q=encodeURIComponent(s||document.body.innerText.slice(0,4000));const u=encodeURIComponent(location.href);open('${base}?source='+u+'&quote='+q,'_blank');})();`;
}

async function copyText(text) {
  await navigator.clipboard.writeText(text);
  setStatus(t("copied"));
}

function setStatus(message, isError = false) {
  const node = $("status");
  node.textContent = message;
  node.className = isError ? "status error" : "status";
}

function renderLinks() {
  const container = $("ai-links");
  container.innerHTML = "";
  aiTargets.forEach(([name, url]) => {
    const link = document.createElement("a");
    link.className = "quick-link";
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = name;
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      if (!$("source-answer").value.trim()) {
        window.open(url, "_blank", "noreferrer");
        return;
      }
      if (!(await ensureSafeToProceed())) return;
      await navigator.clipboard.writeText(buildMasterPrompt());
      window.open(url, "_blank", "noreferrer");
    });
    container.appendChild(link);
  });
}

function renderTimeline() {
  const timeline = $("timeline");
  timeline.innerHTML = "";
  if (!state.transcript.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = t("empty");
    timeline.appendChild(empty);
    return;
  }
  state.transcript.forEach((item) => {
    const message = document.createElement("article");
    message.className = "message";
    const title = document.createElement("h3");
    title.textContent = t(item.role) || item.role;
    const body = document.createElement("p");
    body.textContent = item.text;
    message.append(title, body);
    timeline.appendChild(message);
  });
}

function importFromUrl() {
  const params = new URLSearchParams(location.search);
  const quote = params.get("quote");
  const source = params.get("source");
  const title = params.get("title");
  if (quote) {
    $("source-answer").value = [title, quote].filter(Boolean).join("\n\n");
    $("import-notice").hidden = false;
  }
  if (source && !$("question").value) {
    $("question").value = `Source: ${source}`;
    $("import-notice").hidden = false;
  }
}

async function runRoundtable(event) {
  event.preventDefault();
  const payload = sourcePayload();
  if (!payload.sourceAnswer) {
    setStatus(t("missing"), true);
    return;
  }
  if (!(await ensureSafeToProceed())) return;

  setStatus(t("running"));
  setBusy(true);
  state.transcript = [];
  renderTimeline();

  try {
    const response = await fetch("/api/roundtable", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error || "Request failed.");
    }
    state.transcript = data.transcript;
    renderTimeline();
    setStatus("");
  } catch (error) {
    setStatus(`${error.message} ${t("noApi")}`, true);
  } finally {
    setBusy(false);
  }
}

async function runAutoDebate() {
  const payload = sourcePayload();
  if (!payload.sourceAnswer) {
    setStatus(t("missing"), true);
    return;
  }
  if (!(await ensureSafeToProceed({ auto: true }))) return;

  state.autoRunning = true;
  state.autoIndex = 0;
  const startedAt = Date.now();
  state.transcript = [];
  setStatus(t("autoRunning"));
  setBusy(true);
  renderTimeline();

  while (state.autoRunning && state.autoIndex < AUTO_MAX_TURNS && Date.now() - startedAt < AUTO_MAX_MS) {
    const role = autoRoles[state.autoIndex % autoRoles.length];
    try {
      const response = await fetch("/api/roundtable-step", {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({ ...sourcePayload(), role, transcript: state.transcript }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Request failed.");
      }
      state.transcript.push(data.entry);
      state.autoIndex += 1;
      renderTimeline();
      setStatus(`${t("autoRunning")} ${state.transcript.length}`);
    } catch (error) {
      state.autoRunning = false;
      setStatus(`${error.message} ${t("noApi")}`, true);
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 900));
  }

  if (state.autoRunning) {
    state.autoRunning = false;
    setStatus(t("autoLimitReached"));
  }
  setBusy(false);
}

function stopAutoDebate() {
  state.autoRunning = false;
  setStatus(t("autoStopped"));
}

async function pasteClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    $("source-answer").value = text;
  } catch {
    setStatus(t("pasteFail"), true);
  }
}

function wireEvents() {
  $("roundtable-form").addEventListener("submit", runRoundtable);
  $("auto-button").addEventListener("click", runAutoDebate);
  $("stop-button").addEventListener("click", stopAutoDebate);
  $("paste-button").addEventListener("click", pasteClipboard);
  $("copy-master").addEventListener("click", async () => {
    if (!(await ensureSafeToProceed())) return;
    copyText(buildMasterPrompt());
  });
  $("copy-summary").addEventListener("click", () => {
    const text = state.transcript.map((item) => `[${t(item.role)}]\n${item.text}`).join("\n\n");
    copyText(text || buildMasterPrompt());
  });
  $("copy-bookmarklet").addEventListener("click", () => copyText(bookmarkletCode()));
  $("install-button").addEventListener("click", installApp);
  $("language").addEventListener("change", (event) => {
    localStorage.setItem("roundtable-language", event.target.value);
    detectLanguage();
    applyTranslations();
  });
}

function setupPwa() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    $("install-button").hidden = false;
    setStatus(t("appReady"));
  });

  window.addEventListener("appinstalled", () => {
    state.installPrompt = null;
    $("install-button").hidden = true;
    setStatus(t("appInstalled"));
  });
}

async function installApp() {
  if (!state.installPrompt) return;
  state.installPrompt.prompt();
  await state.installPrompt.userChoice;
  state.installPrompt = null;
  $("install-button").hidden = true;
}

function providerLabel(option) {
  return option ? (option.getAttribute("data-label") || option.value) : "";
}

function updateProviderAvailability() {
  const sel = $("provider");
  const el = $("provider-availability");
  if (!sel || !el) return;
  const status = state.providerStatus || {};
  const name = providerLabel(sel.selectedOptions[0]);
  if (status[sel.value]) {
    el.textContent = t("providerReady").replace("{name}", name);
    el.classList.remove("api-help__status--warn");
  } else {
    el.textContent = t("providerMissing").replace("{name}", name);
    el.classList.add("api-help__status--warn");
  }
}

async function loadProviderStatus() {
  try {
    const response = await fetch("/api/providers");
    const data = await response.json();
    state.providerStatus = data.providers || {};
  } catch {
    state.providerStatus = {};
  }
  // 各選択肢に「キー設定済み / 未設定」を付記して、初見でも要否が分かるようにする
  const sel = $("provider");
  if (sel) {
    Array.from(sel.options).forEach((opt) => {
      const base = opt.getAttribute("data-label") || opt.textContent.trim();
      const suffix = state.providerStatus[opt.value] ? t("optionKeySet") : t("optionKeyMissing");
      opt.textContent = `${base} ${suffix}`;
    });
    if (!sel.dataset.availabilityWired) {
      sel.addEventListener("change", updateProviderAvailability);
      sel.dataset.availabilityWired = "1";
    }
  }
  const hasAny = Object.values(state.providerStatus).some(Boolean);
  if (!hasAny) setStatus(t("noApi"));
  updateProviderAvailability();
}

async function loadCsrfToken() {
  const response = await fetch("/api/csrf");
  const data = await response.json();
  state.csrfToken = data.csrfToken || "";
}

async function init() {
  detectLanguage();
  applyTranslations();
  renderLinks();
  importFromUrl();
  renderTimeline();
  wireEvents();
  $("bookmarklet-link").href = bookmarkletCode();
  setupPwa();
  await loadCsrfToken();
  loadProviderStatus();
}

init();
