var express = require("express");
var util = require("util");

var app = express();

app.use((req, res, next) => {
  util.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(express.static("./public"));

app.listen(80);

console.log("Express app running on port 80");

module.exports = app;
