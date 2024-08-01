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
cargo add diesel_migrations --features sqlite
cargo add chrono --features serde
cargo install diesel_cli --no-default-features --features sqlite-bundled
```

## 初版の DB 定義作成

```sh
mkdir ../db
diesel setup --database-url=../db/task.db
diesel migration generate v0.0.1
cat << EOF > migrations/2024-07-31-052732_v0.0.1/up.sql
create table task (
  id integer primary key autoincrement,
  task_name text not null,
  display_number integer not null
);

create table task_history (
  id integer primary key autoincrement,
  task_id integer not null,
  datetime text not null,
  foreign key (task_id) references task(id) on delete cascade
);
EOF

cat << EOF > migrations/2024-07-31-052732_v0.0.1/down.sql
drop table task;
drop table task_history;
EOF
diesel migration run --database-url=../db/task.db
```

## 開発時の DB の場所定義が面倒なので env で設定するようにする

```sh
cargo add dotenv
echo "DATABASE_URL=../db/task.db" > .env.template
cp .env.template .env
```

## コネクション保存のために Store プラグインを導入

```sh
cargo add tauri-plugin-store@2.0.0-beta
npm add @tauri-apps/plugin-store
```

## ディスプレイモードを記録するために Store プラグインを追加

```sh

```
