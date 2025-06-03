# INOUEPORTFOLIO

[ポートフォリオサイト](https://orca-ha-orca.pages.dev/)


## 背景
今まで、私が開発してきた経験や、制作物を見てもらうものが欲しかった。その中で自分をより知ってもらうために自分の好きな世界観や、自分がSNS等で利用しているアイコン画像をモチーフとしたWebサイトを制作した。

## アプローチ
自分の好きな世界観をより見てくれる方に感じてもらい、視覚的に楽しんでもらうために、Webサイトでは、あまり見ることのない3Dを用いた表現をすることにした。

## 概要
3Dを利用した井上翔人のポートフォリオサイト。
今までのハッカソン等での受賞歴や、現在動いているプロダクト、過去の制作物などが一覧で見ることができる。時間帯によって世界観の雰囲気が変わる。

## 技術スタックと選定理由
### フレームワーク: Next.js
まずNext.jsを選定した理由として、3Dを用いたWebサイトということでサイトが重くならないようにパーフォーマンスの向上が必要だと感じた。静的サイトであれば、SSGなどに特化したAstro等を利用しても良かったが、ReactThreeFiberを利用する都合上クライアント側での処理も必要になった、そのため、ファイル単位でサーバーコンポーネントとクライアントコンポーネントを変更することのできるAppRouterを利用するためにNext.jsを選定した。

### 言語: TypeScript
自身のポートフォリオサイトということで、今後もアップデートを重ねていく予定で
コードの保守性を保つためにも型安全に記述することが大切だと感じた。

### スタイリング: SCSS
CSSを記述する上で、HTMLと同じ階層構造でスタイリングを記述できる点がコードの管理のしやすさに繋がると感じた。

## 開発環境のセットアップ

```bash
git clone git@github.com:hiroto09/Hiroto-Portfolio.git
```

```bash
npm i
```

```badh
npm run dev
````

## ディレクトリ構造
```
.
├── app
│   ├── (default_site)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── post
│   │       └── [id]
│   │           └── page.tsx
│   ├── favicon.ico
│   ├── globals.scss
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.module.css
├── components
│   ├── const
│   │   ├── icons
│   │   │   └── Icon.tsx
│   │   └── post
│   │       ├── PostCard.module.scss
│   │       └── PostCard.tsx
│   ├── features
│   │   ├── main
│   │   │   ├── Main.tsx
│   │   │   ├── about
│   │   │   │   ├── About.module.scss
│   │   │   │   └── About.tsx
│   │   │   ├── active
│   │   │   │   └── Active.tsx
│   │   │   ├── awards
│   │   │   │   ├── Awards.tsx
│   │   │   │   └── award-card
│   │   │   │       ├── AwardCard.module.scss
│   │   │   │       └── AwardCard.tsx
│   │   │   ├── background
│   │   │   │   ├── Three.module.scss
│   │   │   │   └── Three.tsx
│   │   │   ├── projects
│   │   │   │   └── Projects.tsx
│   │   │   ├── skills
│   │   │   │   ├── Skills.tsx
│   │   │   │   └── skill-icons
│   │   │   │       ├── SkilIcons.tsx
│   │   │   │       └── SkillIcons.module.scss
│   │   │   └── title
│   │   │       ├── Title.module.scss
│   │   │       └── Title.tsx
│   │   ├── not-found
│   │   │   ├── NotFound.module.scss
│   │   │   └── NotFound.tsx
│   │   └── post
│   │       ├── Post.module.scss
│   │       └── Post.tsx
│   └── layouts
│       ├── footer
│       │   ├── Footer.module.scss
│       │   └── Footer.tsx
│       ├── header
│       │   ├── Header.module.scss
│       │   └── Header.tsx
│       ├── post
│       │   ├── PostLayout.module.scss
│       │   └── PostLayout.tsx
│       └── section
│           ├── SectionLayout.module.scss
│           └── SectionLayout.tsx
└── libs
    └── mcms
        └── client.ts
```
### app
ルーティングを管理

### features
各ページごとのフォルダを管理

### main
メインページでのコンポーネントを管理

### post
記事ページでのコンポーネントを管理

### layouts
画面全体のレイアウトを管理



