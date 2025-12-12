"use strict";


const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station2 = [
    { id: 1, name: "東京", passengers: 425231, distance: 0.0 },
    { id: 2, name: "八丁堀", passengers: 26827, distance: 1.2 }
];

app.get("/keiyo2", (req, res) => {
    // 元の処理
});



let tasks = [
    { id: 1, subject: "Webプログラミング", title: "第10回レポート", deadline: 20251212, time: 60 },
    { id: 2, subject: "線形代数", title: "中間テスト復習", deadline: 20251215, time: 120 }
];

app.get("/tasks", (req, res) => {
    // tasks_list.ejs を表示する設定
    res.render("tasks_list", { data: tasks });
});

// --- 追加機能 (Create) ---

// 2. 新規追加画面の表示 (GET)
// 「新規追加」リンクをクリックしたときに、HTMLファイルを送る
app.get("/tasks/create", (req, res) => {
    res.redirect("/public/tasks_create.html");
});

// 3. 追加処理の実行 (POST)
// フォームから送られてきたデータを受け取って、配列に追加する
app.post("/tasks/create", (req, res) => {
    // 新しいIDを決める（現在のデータの最大ID + 1）
    // データが空ならIDは1にする
    let newId = 1;
    if (tasks.length > 0) {
        newId = tasks[tasks.length - 1].id + 1;
    }

    // フォームのデータをまとめる
    let newTask = {
        id: newId,
        subject: req.body.subject,
        title: req.body.title,
        deadline: Number(req.body.deadline), // 数値に変換
        time: Number(req.body.time)          // 数値に変換
    };

    // 配列に追加
    tasks.push(newTask);

    // 一覧画面に戻る
    res.redirect("/tasks");
});


// --- 詳細表示機能 (Read - Detail) ---
app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    // 配列から、URLのIDと同じIDを持つデータを探す
    const task = tasks.find((item) => item.id === parseInt(id));

    if (task) {
        // 見つかったら表示用のファイルにデータを渡す
        res.render("tasks_detail", { data: task });
    } else {
        res.send("その課題は見つかりません");
    }
});// --- 削除機能 (Delete) ---
app.get("/tasks/delete/:id", (req, res) => {
    const id = req.params.id;
    // 指定されたID以外のデータだけを残す（＝指定IDを削除）
    tasks = tasks.filter((item) => item.id !== parseInt(id));
    res.redirect("/tasks");
});

// --- 編集機能 ---

//  編集画面の表示 
app.get("/tasks/edit/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((item) => item.id === parseInt(id));

    if (task) {
        res.render("tasks_edit", { data: task });
    } else {
        res.send("その課題は見つかりません");
    }
});

//  更新処理の実行 
app.post("/tasks/update/:id", (req, res) => {
    const id = req.params.id;
    // 更新するデータを探す
    const task = tasks.find((item) => item.id === parseInt(id));

    if (task) {
        // データを上書きする
        task.subject = req.body.subject;
        task.title = req.body.title;
        task.deadline = Number(req.body.deadline);
        task.time = Number(req.body.time);
    }
    res.redirect("/tasks");
});


// --- システム2：参考文献管理システム ---

// データ（初期データ）
let references = [
    { id: 1, author: "千葉太郎", title: "Web技術入門", year: 2023, importance: 5 },
    { id: 2, author: "津田沼花子", title: "現代デザイン論", year: 2024, importance: 3 }
];

// 1. 一覧表示 (Read)
app.get("/references", (req, res) => {
    res.render("references_list", { data: references });
});

// ★★★ ここに移動！「詳細」より先に書くことで、吸い込まれるのを防ぎます ★★★
// 3. 新規追加 (Create)
app.get("/references/create", (req, res) => {
    res.redirect("/public/references_create.html");
});

app.post("/references/create", (req, res) => {
    let newId = 1;
    if (references.length > 0) {
        newId = references[references.length - 1].id + 1;
    }
    let newRef = {
        id: newId,
        author: req.body.author,
        title: req.body.title,
        year: Number(req.body.year),
        importance: Number(req.body.importance)
    };
    references.push(newRef);
    res.redirect("/references");
});
// ★★★ 移動ここまで ★★★


// 2. 詳細表示 (Read - Detail)
// ※これは create のチェックが終わった後に配置する
app.get("/references/:id", (req, res) => {
    const id = req.params.id;
    const ref = references.find((item) => item.id === parseInt(id));
    if (ref) {
        res.render("references_detail", { data: ref });
    } else {
        res.send("その文献は見つかりません");
    }
});


// 4. 編集機能 (Update)
app.get("/references/edit/:id", (req, res) => {
    const id = req.params.id;
    const ref = references.find((item) => item.id === parseInt(id));
    if (ref) {
        res.render("references_edit", { data: ref });
    } else {
        res.send("その文献は見つかりません");
    }
});

app.post("/references/update/:id", (req, res) => {
    const id = req.params.id;
    const ref = references.find((item) => item.id === parseInt(id));
    if (ref) {
        ref.author = req.body.author;
        ref.title = req.body.title;
        ref.year = Number(req.body.year);
        ref.importance = Number(req.body.importance);
    }
    res.redirect("/references");
});

// 5. 削除機能 (Delete)
app.get("/references/delete/:id", (req, res) => {
    const id = req.params.id;
    references = references.filter((item) => item.id !== parseInt(id));
    res.redirect("/references");
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));