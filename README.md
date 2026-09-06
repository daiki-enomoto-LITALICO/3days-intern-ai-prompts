# 3daysインターン プロンプト集

LITALICO 3daysインターンシップ向けの、チャットAIに貼るプロンプト集です。

**公開ページ:** https://daiki-enomoto-litalico.github.io/3days-intern-ai-prompts/

学生は上の URL を開けば使えます。コピーボタン・タブ・検索・ダーク／ライト切替があります。

## ディレクトリ構成

```
.
├── README.md                 このファイル。リポジトリの説明
├── .gitignore
├── prompts.md                プロンプト本文（編集の正）
└── docs/                     GitHub Pages の公開面
    ├── .nojekyll             Jekyll を使わず静的ファイルをそのまま配信する
    ├── index.html            学生が開くページ
    └── assets/
        ├── css/style.css     配色・レイアウト
        ├── js/main.js        コピー・タブ・検索・テーマ
        └── img/mark.png      アイコン／あしらい
```

- **学生が使うもの** — `docs/`（GitHub Pages）
- **文面を直すとき** — 先に `prompts.md` を直す。公開ページは `docs/index.html` に反映する
- **見た目・操作を直すとき** — `docs/assets/` を直す

リポジトリ直下には `index.html` を置かない。公開されるのは `docs/` だけ。

## ローカルで確認

```bash
python -m http.server 8000 --directory docs
```

http://localhost:8000 を開く。

## GitHub Pages

Settings → Pages の Source は次のとおり。

- Branch: `main`
- Folder: `/docs`

## 注意

- 人が決めるのは課題。AIは深める相棒。
- 事業アイデアは、課題が固まるまで出さない。
- 一字一句そのままでなくてよい。
- AIの回答は誤りを含むことがあります。考える材料として使い、課題はチームで決めてください。
