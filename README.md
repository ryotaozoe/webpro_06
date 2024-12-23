# webpro_06

## このプログラムについて

概要

このプログラムは、簡単なブラウザアプリケーションを提供し、以下のような複数の機能を実現する。

じゃんけんゲーム: プレイヤーとCPUがじゃんけんを行い、勝敗を判定する。

足し算機能: 入力された2つの数値を加算して結果を表示する。

日付表示: 現在の日付を取得してフォーマットされた形で表示する。

四則演算: 入力された数値と演算子に基づいて計算結果を返す。

(1) 起動方法や編集したファイルをGitで管理する
起動方法


1. node app5.js で開発サーバーを起動
2. 下記URLでそれぞれのブラウザにアクセス
3. 足し算: http://localhost:8080/add
4. 四則演算: http://localhost:8080/calc
5. 日付表示: http://localhost:8080/today
6. じゃんけん: http://localhost:8080/janken

編集したファイルのgitでの管理方法
1. git add . 変更をステージングに追加
2. git commit -am 'コメント' 追跡済みのファイルの変更をコミット.また,コミットメッセージを直接指定.
3. git push 変更内容をリモートリポジトリに変更.



## ファイル一覧

ファイル名 | 説明
-|-
app5.js | プログラム本体
views/janken.ejs | じゃんけんの開始画面
views/today.ejs | 日付表示の開始画面
views/add.ejs | 足し算の開始画面
views/calc.ejs | 四則演算の開始画面


## app5.js
じゃんけんの勝ち負け判定
```mermaid
flowchart TD;

start["開始"];
input["入力（手：グー、チョキ、
パー）"];
cpu["CPUの手をランダムに決定"];
check_result{"勝敗の判定"};
result_win["結果：勝ち"];
result_draw["結果：引き分け"];
result_lose["結果：負け"];
end1["終了"];

start --> input --> cpu --> check_result;

check_result -->|勝ち| result_win;
check_result -->|引き分け| result_draw;
check_result -->|負け| result_lose;

result_win --> end1;
result_draw --> end1;
result_lose --> end1;
```

足し算の結果表示
```mermaid
flowchart TD;

    start2["開始"];
    get_params["パラメータnum1と
    num2を取得"];
    convert["数値に変換"];
    calculate["足し算を実行"];
    display_sum["結果を表示"];
    end2["終了"];
    start2 --> get_params --> convert --> calculate --> display_sum --> end2;
```
日付の表示
```mermaid
flowchart TD;

    start3["開始"];
    get_today["現在の日付を取得"];
    format_date["日付を YYYY-MM-DD 形式に
    フォーマット"];
    send_response["日付をクライアントに送信"];
    end3["終了"];
    start3 --> get_today --> format_date --> send_response --> end3;
```

四則演算の結果表示
```mermaid
flowchart TD;

    start4["開始"]
    get_params4["num1とnum2とopを取得"]
    convert4["数値に変換"]
    calculate4["opに基づいて四則演算を
    実行"]
    display_sum4["結果を表示"]
    end4["終了"]
    
    start4 --> get_params4 --> convert4 --> calculate4 --> display_sum4 --> end4
```
