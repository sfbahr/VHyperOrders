var express = require("express");
var util = require("util");
var pg = require("pg");

var conString = "postgres://user:password@localhost/orders";

pg.connect(conString, (err, client, done) => {
  if (err) {
    return console.error('error fetching client from pool', err);
  }

  client.query('select * FROM test', [], (err, result) => {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
  });
});

var app = express();

app.use((req, res, next) => {
  util.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(express.static("./public"));

app.listen(80);

console.log("Express app running on port 80");

module.exports = app;
