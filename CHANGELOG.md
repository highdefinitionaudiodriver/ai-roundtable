# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- UX: ワンクリック「サンプルで試す」ボタン（質問＋回答を即充填し、実行/共有コピーでそのまま試せる）。空フォームの初見ハードルを解消
- UX: 検討会の実行完了時に結果へ自動スクロール、主要アクション（実行）の視認性向上、サンプル投入時の操作ヒント表示
- UX: 結果パネルが空のときにも「サンプルで試す」ボタンを表示し、初見での発見性を向上

## [0.3.0] - 2026-06-04

### Added
- アプリ内実行のプロバイダを 3 → **8 社**に拡張：OpenAI / Anthropic / Gemini に加え、**xAI Grok / Groq / Mistral / DeepSeek / Perplexity**（OpenAI Chat Completions 互換）。サーバ側はレジストリ＋汎用呼び出し `call_openai_compatible` で実装。各プロバイダの API キー・モデル・トークン上限は環境変数で個別設定可能（`.env.example` 参照）
- 初見でも API キーの要否が分かる UI を追加：プロバイダ選択肢に「（キー設定済み）／（キー未設定）」を表示、選択中プロバイダの状態メッセージ、設定方法の案内ブロック（環境変数の例）を画面に常設
- マルチプロバイダ対応の単体テスト（プロバイダ一覧、キー未設定時の明確なエラー、未知プロバイダの OpenAI フォールバック等、6ケース追加 → 計19）

## [0.2.0] - 2026-06-04

### Added
- README に「これは何？（30秒で）」「想定ユースケース・価格帯」セクションを追加
- SECURITY.md を追加（脆弱性報告フロー）
- 商用利用・カスタマイズ依頼の連絡先を README 末尾に明記
- サーバ側純粋ロジック（セーフティ判定・transcript整形・プロンプト生成・入力検証）の単体テストを `tests/test_server_logic.py` に追加（ネットワーク不要、13ケース）

## [0.1.0]

### Added
- 初版リリース
