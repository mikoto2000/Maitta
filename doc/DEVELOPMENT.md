# DEVELOPMENT

## create project

```sh
npm create tauri-app@latest -- --beta
```

## build and run

```sh
npm i
npm run tauri dev
```

## UI コンポーネントフレームワーク追加

```sh
npm install @mui/material @emotion/react @emotion/styled
```

## 日付ライブラリ追加

```sh
npm i dayjs
```

## アイコン用パッケージ追加

```sh
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
```

## 画面遷移用パッケージ追加

```sh
npm i react-router react-router-dom
```

## バックエンドの RDBMS 用ライブラリ導入

```sh
cargo add diesel --features sqlite,chrono
cargo add chrono
```
