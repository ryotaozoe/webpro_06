const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

// Hello World 機能
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

// アイコン表示機能
app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

// 運勢機能
app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

// じゃんけん機能
app.get("/janken", (req, res) => {
  let hand = req.query.hand;  // 人間の手
  let win = Number(req.query.win); // 勝ち数
  let total = Number(req.query.total); // 総ゲーム数
  const num = Math.floor(Math.random() * 3 + 1); // CPUの手（1〜3）

  let cpu = ''; // CPUの手
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';

  // 勝敗の判定
  let judgement = '';
  if (hand === 'グー') {
    if (cpu === 'グー') judgement = '引き分け';
    else if (cpu === 'チョキ') {
      judgement = '勝ち';
      win += 1;
    } else judgement = '負け';
  } else if (hand === 'チョキ') {
    if (cpu === 'グー') judgement = '負け';
    else if (cpu === 'チョキ') judgement = '引き分け';
    else {
      judgement = '勝ち';
      win += 1;
    }
  } else if (hand === 'パー') {
    if (cpu === 'グー') {
      judgement = '勝ち';
      win += 1;
    } else if (cpu === 'チョキ') judgement = '負け';
    else judgement = '引き分け';
  }

  // 総ゲーム数を更新
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('janken', display);
});

// 足し算機能
app.get("/add", (req, res) => {
  let num1 = req.query.num1 ? Number(req.query.num1) : undefined;
  let num2 = req.query.num2 ? Number(req.query.num2) : undefined;
  let sum = undefined;

  if (!isNaN(num1) && !isNaN(num2)) {
    sum = num1 + num2;
  }

  res.render("add", { num1, num2, sum });
});

// 今日の日付を返す機能
app.get("/today", (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0]; // YYYY-MM-DD形式
  res.render("today", { date });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

// 四則演算機能
app.get("/calc", (req, res) => {
  let num1 = req.query.num1 ? Number(req.query.num1) : undefined; // 数字1
  let num2 = req.query.num2 ? Number(req.query.num2) : undefined; // 数字2
  let op = req.query.op ? decodeURIComponent(req.query.op) : undefined; // 演算子
  let result = undefined; // 結果を格納する変数

  if (!isNaN(num1) && !isNaN(num2)) {
    switch (op) {
      case '+': result = num1 + num2; break; // 足し算
      case '-': result = num1 - num2; break; // 引き算
      case '*': result = num1 * num2; break; // 掛け算
      case '/': 
        result = num2 !== 0 ? num1 / num2 : "Error: Division by zero"; 
        break; // 割り算（ゼロ割りチェックあり）
      default: 
        result = "Invalid operator"; // 無効な演算子
    }
  } else {
    result = "Invalid input"; // 数字が入力されていない場合
  }

  res.render("calc", { num1, num2, op, result }); // レンダリング時に結果を送信
});
