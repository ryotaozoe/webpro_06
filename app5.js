const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

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


// 数字の足し算をする機能
app.get("/add", (req, res) => {
  let num1 = Number(req.query.num1);
  let num2 = Number(req.query.num2);
  let sum = num1 + num2;
  res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

// 今日の日付を返す機能
app.get("/today", (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0]; // YYYY-MM-DD形式で表示
  res.send(`Today's date is ${date}`);
});
