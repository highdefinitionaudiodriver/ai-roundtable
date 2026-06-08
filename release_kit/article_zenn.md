---
title: "AI Roundtable - AI 円卓会議 を作った — ローカル完結で動かす実用ツール"
emoji: "🛠️"
type: "tech"
topics: ["python", "個人開発", "oss"]
published: false
---

> 本記事は Zenn 用の下書きです。Qiita に出す場合は先頭の frontmatter を削除してください。

## TL;DR

AI Roundtable is a local web app for taking an answer from one AI and asking other AI roles to review, challenge, expand, and summarize it.

- リポジトリ: https://github.com/highdefinitionaudiodriver/ai-roundtable
- ライセンス: MIT / バージョン: v0.2.0

## 作った背景・課題

（なぜ作ったか。既存ツールの不満、手作業の手間などを 2〜3 段落で。）

## できること

- Paste or import an AI answer in any language.
- Copy ready-made prompts for ChatGPT, Claude, Gemini, Perplexity, Grok, or Copilot.
- Run a four-role roundtable locally when API keys are configured.
- Start an auto debate that continues until the user presses Stop.
- Apply simple safety gating for blocked and high-risk topics.
- Protect local API endpoints with same-origin and CSRF checks.
- Install on a phone as a PWA.
- Receive shared text or URLs from supported mobile share menus.

## 仕組み / 工夫した点

（設計上のポイント。ローカル完結・プライバシー配慮・依存の少なさ など。）

## 使い方

```bash
# インストール・起動例（README から転記）
```

## ハマったところ

（開発中の課題と解決。）

## おわりに

フィードバックは Issues / Star をいただけると励みになります。

リポジトリ: https://github.com/highdefinitionaudiodriver/ai-roundtable
