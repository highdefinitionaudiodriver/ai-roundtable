# Publication Checklist

Use this before publishing to GitHub or posting on X.

## Required

- [ ] Confirm `.env` is not committed.
- [ ] Confirm `.env.local`, `*.key`, `*.pem`, `.vscode/`, `.idea/`, and `__pycache__/` are not committed.
- [ ] Confirm API keys are not present in code, screenshots, Excel, or README.
- [ ] Review `run.bat` and confirm it contains no personal paths or secrets.
- [ ] Inspect `AI_Roundtable_設計書.xlsx` metadata and remove author/PC-user information if needed.
- [ ] Run `python -m py_compile server.py tools\create_design_doc.py`.
- [ ] Start the app with `python server.py`.
- [ ] Check `http://127.0.0.1:8787`.
- [ ] Confirm prompt-copy mode works without API keys.
- [ ] Confirm auto debate shows an API-key error when keys are missing.
- [ ] Confirm a high-risk topic shows the confirmation dialog.
- [ ] Confirm the high-risk dialog shows category guidance and the destination provider.
- [ ] Confirm password/API-key-like content is blocked by default.
- [ ] Confirm an obviously blocked topic is stopped before API submission.
- [ ] Confirm direct POST without `X-CSRF-Token` returns 403.
- [ ] Confirm the transparency notice is visible.
- [ ] Confirm auto debate stops at the configured hard limit.
- [ ] Confirm provider output-token limits are configured.
- [ ] Confirm `AI_Roundtable_設計書.xlsx` opens.
- [ ] Add at least one screenshot or short GIF to the README.
- [ ] Decide whether the MIT License is acceptable.
- [ ] Before the first commit, run `git status --short` and review every file.
- [ ] After `git init`, confirm `git log` has no earlier commit containing secrets.

## Recommended

- [ ] Use a low-risk demo topic such as travel planning, study planning, or code review.
- [ ] Avoid medical, legal, financial, or personal data examples in public screenshots.
- [ ] Mention that auto debate can consume API credits.
- [ ] Mention that all AI-provider terms and privacy policies still apply.
- [ ] Test the PWA install flow on Android Chrome.
- [ ] Test iPhone Safari home-screen install manually if targeting iOS users.
- [ ] Keep the first X/GitHub announcement framed as a local MVP and invite feedback.
