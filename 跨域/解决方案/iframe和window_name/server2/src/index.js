const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/test1", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../html/index.html"));
});
app.get("/test2", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../html/index2.html"));
});

app.get("/", (req, res) => {
  res.send("<h1>server2 page</h1>");
});

app.listen(8082, () => {
  console.log("server2 start ");
});
