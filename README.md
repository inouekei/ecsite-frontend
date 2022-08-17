# アプリケーション名
ecsite
認証を用いた簡単な商品の購入と購入履歴が確認できるECサイト
![front](https://user-images.githubusercontent.com/108909962/185006315-8978d3a9-6fb1-48bd-b095-7fb200fe2732.png)

## 作成した目的
提出課題のため

## 他のリポジトリ
バックエンドのリポジトリ
https://github.com/inouekei/ecsite-backend/

## 機能一覧
- 会員登録
- ログイン
- ログアウト
- 商品一覧取得
- 商品詳細取得
- 商品をカートに追加
- カートから商品を削除
- カート内の商品数を変更
- カートの商品を注文
- 購入履歴一覧取得

## 使用技術（実行環境）
- JavaScript(Nuxt.js)、VeeValidate、Auth、Persisted state

## テーブル設計
![table](https://user-images.githubusercontent.com/108909962/185005814-df48e2aa-6239-4fce-aa91-ca09e1e1793f.png)

## ER図
![index drawio](https://user-images.githubusercontent.com/108909962/185008012-eb9f4043-cb44-4205-9434-0e8f47215fbc.png)

## 環境構築
- バックエンドを構築する
- フロントエンドのトップでyarn devとコマンド入力して、表示されたアドレスにブラウザでアクセスする
- /authでユーザー登録を行った後にログインする必要がある
