const express = require("express");
const { readFileSync } = require("fs");
const { resolve } = require("path");
const app = express();
app.get("/test", (req, res) => {
  res.sendFile(resolve(__dirname, "../html/index.html"));
});

app.get("/getTeachers", (req, res) => {
  const teacherData = JSON.parse(
    readFileSync(resolve(__dirname, "../data/teachers.json"), "utf-8")
  );
  console.log(teacherData);
  res.send(teacherData);
});

app.get("/getStudents", (req, res) => {
  const studentData = JSON.parse(
    readFileSync(resolve(__dirname, "../data/students.json"), "utf-8")
  );

  res.send(studentData);
});

app.get("/", (req, res) => {
  res.send("<h1>server1 page</h1>");
});
app.listen(8081, () => {
  console.log("server1 start ");
});
