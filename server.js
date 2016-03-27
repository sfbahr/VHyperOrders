const express = require("express");
const util = require("util");
const pg = require("pg");

const conString = "postgres://user:password@localhost/orders";
const port = 80;

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

const app = express();

app.use((req, res, next) => {
  util.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(express.static("./public"));

app.listen(port);

console.log(`Express app running on port ${port}`);

module.exports = app;
