const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const { readFileSync } = require("fs");
const { resolve } = require("path");
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);
app.use(bodyParse.json());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-methods", "GET,POST");
  next();
});

let myResults = [];
app.post("/getQuestion", function (req, res) {
  const order = req.body.order;
  const quesdata = JSON.parse(readFileSync(resolve(__dirname, "data/question.json"), "utf-8"));
  const questionResult = quesdata[order];
  if (questionResult) {
    const { id, question, items } = questionResult;
    res.send({
      errCode: 0,
      msg: "OK",
      data: {
        id,
        question,
        items,
      },
    });
  } else {
    res.send({ data: myResults, errCode: 1, msg: "NO_DATA" });
    myResults = [];
  }
});
app.post("/uploadAnswer", function (req, res) {
  const { order, myAnswer } = req.body;
  const quesdata = JSON.parse(readFileSync(resolve(__dirname, "data/question.json"), "utf-8"));
  const { id, question, items, answer } = quesdata[order];
  myResults.push({
    qid: id,
    question,
    myAnswer: items[myAnswer],
    rightAnswer: items[answer],
    isRight: myAnswer == answer,
  });
  // res.send(myResults);
  res.send({
    errCode: 0,
    msg: "OK",
  });
});
app.listen(8888, function () {
  console.log("welcome to Express on 8888:");
});
