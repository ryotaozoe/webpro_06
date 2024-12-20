# webpro_06

## このプログラムについて

## ファイル一覧

ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面


```javascript
console.log( 'Hello' );
```


```mermaid
flowchart TD;
開始 --> 終了;
```
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```

app5.js
じゃんけんの勝ち負け判定
```mermaid
flowchart TD;

start["開始"];
input["入力（手：グー、チョキ、パー）"];
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
    get_params["パラメータ num1 と num2 を取得"];
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
    format_date["日付を YYYY-MM-DD 形式にフォーマット"];
    send_response["日付をクライアントに送信"];
    end3["終了"];
    start3 --> get_today --> format_date --> send_response --> end3;
```

四則演算
```mermaid
flowchart TD;

    start4["開始"]
    get_params4["num1とnum2とopを取得"]
    convert4["数値に変換"]
    calculate4["opに基づいて四則演算を実行"]
    display_sum4["結果を表示"]
    end4["終了"]
    
    start4 --> get_params4 --> convert4 --> calculate4 --> display_sum4 --> end4
```
