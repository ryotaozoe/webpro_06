"use strict";


const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
// --- ホーム画面 (Top Page) ---
app.get("/", (req, res) => {
    res.render("index");
});



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
    res.render("tasks_list", { data: tasks });
});


//  新規追加画面
app.get("/tasks/create", (req, res) => {
    res.render("tasks_create");
});

// 追加処理
app.post("/tasks/create", (req, res) => {

    let newId = 1;
    if (tasks.length > 0) {
        newId = tasks[tasks.length - 1].id + 1;
    }
    let newTask = {
        id: newId,
        subject: req.body.subject,
        title: req.body.title,
        deadline: Number(req.body.deadline), 
        time: Number(req.body.time)          
    };
    tasks.push(newTask);
    res.redirect("/tasks");
});


// 詳細表示
app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((item) => item.id === parseInt(id));

    if (task) {
        res.render("tasks_detail", { data: task });
    } else {
        res.send("その課題は見つかりません");
    }
});
// 削除機能 
app.get("/tasks/delete/:id", (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter((item) => item.id !== parseInt(id));
    res.redirect("/tasks");
});

// 編集
app.get("/tasks/edit/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((item) => item.id === parseInt(id));

    if (task) {
        res.render("tasks_edit", { data: task });
    } else {
        res.send("その課題は見つかりません");
    }
});

//  更新
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


// 参考文献管理
// データ
let references = [
    { id: 1, author: "千葉太郎", title: "Web技術入門", year: 2023, importance: 5 },
    { id: 2, author: "津田沼花子", title: "現代デザイン論", year: 2024, importance: 3 }
];

// 一覧表示
app.get("/references", (req, res) => {
    res.render("references_list", { data: references });
});

// 新規追加
app.get("/references/create", (req, res) => {
    res.render("references_create");
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
// 詳細表示 
app.get("/references/:id", (req, res) => {
    const id = req.params.id;
    const ref = references.find((item) => item.id === parseInt(id));
    if (ref) {
        res.render("references_detail", { data: ref });
    } else {
        res.send("その文献は見つかりません");
    }
});


//  編集
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

//  削除
app.get("/references/delete/:id", (req, res) => {
    const id = req.params.id;
    references = references.filter((item) => item.id !== parseInt(id));
    res.redirect("/references");
});

// 家計簿
// データ
let household = [
    { id: 1, category: "食費", item: "コンビニ弁当", amount: 550, date: 20251201 },
    { id: 2, category: "交通費", item: "バス代", amount: 220, date: 20251202 }
];

// 一覧表示
app.get("/household", (req, res) => {
    res.render("household_list", { data: household });
});
// 新規追加
app.get("/household/create", (req, res) => {
    res.render("household_create");
});

app.post("/household/create", (req, res) => {
    let newId = 1;
    if (household.length > 0) {
        newId = household[household.length - 1].id + 1;
    }
    let newData = {
        id: newId,
        category: req.body.category,
        item: req.body.item,
        amount: Number(req.body.amount),
        date: Number(req.body.date)
    };
    household.push(newData);
    res.redirect("/household");
});

//  詳細
app.get("/household/:id", (req, res) => {
    const id = req.params.id;
    const data = household.find((item) => item.id === parseInt(id));
    if (data) {
        res.render("household_detail", { data: data });
    } else {
        res.send("そのデータは見つかりません");
    }
});

// 編集
app.get("/household/edit/:id", (req, res) => {
    const id = req.params.id;
    const data = household.find((item) => item.id === parseInt(id));
    if (data) {
        res.render("household_edit", { data: data });
    } else {
        res.send("そのデータは見つかりません");
    }
});

app.post("/household/update/:id", (req, res) => {
    const id = req.params.id;
    const data = household.find((item) => item.id === parseInt(id));
    if (data) {
        data.category = req.body.category;
        data.item = req.body.item;
        data.amount = Number(req.body.amount);
        data.date = Number(req.body.date);
    }
    res.redirect("/household");
});

//　削除
app.get("/household/delete/:id", (req, res) => {
    const id = req.params.id;
    household = household.filter((item) => item.id !== parseInt(id));
    res.redirect("/household");
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));