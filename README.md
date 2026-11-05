# ジェンガルア配合録

身近な生き物「魔生物」をスカウトし、配合して育てるRPG。

- 遊ぶ: https://5287354-droid.github.io/jengarua/
- Androidでは Chrome で開き、メニューの「ホーム画面に追加」(または「アプリをインストール」)でアプリとして使えます。
- セーブデータは端末の中に保存されます。ときどき「セーブ管理 → ファイルに保存」でバックアップしてください。

## おまけ: のんびり金魚すくい
- 遊ぶ: https://5287354-droid.github.io/jengarua/kingyo/
- スマホ向けのミニゲーム。ファイルは `kingyo/index.html` だけで完結しています。

## 開発メモ
- ゲーム本体の元ファイル: `src/game.html`(claude.ai版と共通)
- 追加データの下書き: `src/parts/`
- アプリ版の作り直し: `python3 tools/build_app.py src/game.html .`
- 魔生物のイラスト: `art/original/<魔生物id>.jpg` に置いて `python3 tools/embed_art.py` を実行し、そのあとアプリ版を作り直す
