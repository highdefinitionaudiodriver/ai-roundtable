# Safety Notes

AI Roundtable can send user-provided text to external AI providers when API keys are configured. Treat all user input as potentially sensitive.

## Before Sharing Publicly

- Do not paste personal data, credentials, internal documents, or customer information into screenshots.
- Avoid demo examples involving medical, legal, financial, or safety-critical advice.
- Explain that auto debate may repeatedly call paid APIs until stopped.
- Explain that provider privacy policies and terms still apply.

## Product Notes

- API keys are read from environment variables and are not exposed to browser JavaScript.
- Without API keys, the app works as a prompt-copy router.
- Auto debate is client-controlled: the browser requests one message at a time and can stop before requesting the next message. It also stops at 10 turns or 10 minutes.
- Obvious requests involving self-harm facilitation, illegal activity, weapons, fraud, harm to others, or sensitive data patterns are blocked by local keyword rules on both the client and server.
- High-risk topics, including mental-health support, medical, legal, financial, employment, education, housing, or government services, show a confirmation dialog with category-specific guidance and the destination provider.
- These local keyword rules are guardrails, not a substitute for moderation, legal review, or provider policy compliance.
- Local API endpoints reject unexpected origins and require an `X-CSRF-Token` header.
- The server is bound to `127.0.0.1` for personal local use. Other local processes on the same machine can technically access it, so do not run it on a machine you do not trust.
- In-app runs use the selected provider/model to role-play multiple perspectives; they are not independent verification by separate AI systems.
- Provider calls use explicit output-token limits. Gemini calls include explicit safety settings.
- URL/share prefilled content is marked with an external-import warning.
- The bookmarklet currently passes selected text through the URL query string. Do not use it for confidential content.

## Recommended Product Policy

AI Roundtable is for comparison, critique, and discussion. It is not a substitute for professional advice or human decision-making. Do not use it to make medical, legal, financial, employment, credit, insurance, education, housing, or government-service decisions without qualified human review.
