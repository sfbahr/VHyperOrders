const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require("express");
const util = require("util");
const bodyParser = require("body-parser");
const pg = require("pg");

const conString = "postgres://user:password@localhost/orders";
const port = 80;
const password = "password";

function pgQuery(queryString, params, callback) {
  pg.connect(conString, (err, client, done) => {
    if (err) {
      util.log('error fetching client from pool', err);
      callback("Couldn't create a connection to the database");
    } else {
      client.query(queryString, params, (err, result) => {
        done();
        if (err) {
          util.log('error running query', err);
          callback(err.routine);
        } else {
          callback(null, result);
        }
      });
    }
  });
}

pgQuery('select * FROM status', [], (err, result) => {
  if (err) {
    return console.error('error running query', err);
  } else {
    console.log(result.rows);
  }
});

const app = express();

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  util.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(express.static("./public"));

app.get("/password/:check", (req, res) => {
  if (req.params.check === password) {
    res.status(200).json({
      password: req.params.check,
      isCorrect: true
    });
  } else {
    res.status(404).json({
      password: req.params.check,
      isCorrect: false
    });
  }
});

app.get(`/orders/${password}`, (req, res) => {
  const queryString = String.raw`SELECT o.id,
    o.status_id,
    o.tracking_link,
    o.name,
    o.number,
    o.link,
    o.category,
    o.material,
    o.supplier,
    o.price,
    o.quantity,
    o.notes,
    (
      SELECT c.datetime AT TIME ZONE 'America/New_York'::varchar
      FROM changes c
      WHERE c.order_id = o.id
      ORDER BY datetime DESC
      LIMIT 1
    ) updated
  FROM orders o
  ORDER BY updated DESC
  ;`;
  
  pgQuery(queryString, [], (err, result) => {
    if (err) {
      res.status(500).json({err});
    } else {
      res.status(200).json(result.rows);
    }
  });
});

app.get(`/orders/:id/changes/${password}`, (req, res) => {
  const queryString = String.raw`SELECT
      c.id,
      c.order_id,
      c.old_status_id,
      c.new_status_id,
      (c.datetime AT TIME ZONE 'America/New_York')::varchar AS datetime
    FROM changes c
    WHERE order_id = $1::integer
    ORDER BY datetime
    ;`;
  
  pgQuery(queryString, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({err});
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Create
app.post(`/orders/${password}`, (req, res) => {
  util.log(`body=${JSON.stringify(req.body)}`);
  const status_id =     req.body.status_id;
  const tracking_link = req.body.tracking_link;
  const name =          req.body.name;
  const number =        req.body.number;
  const link =          req.body.link;
  const category =      req.body.category;
  const material =      req.body.material;
  const supplier =      req.body.supplier;
  const price =         req.body.price;
  const quantity =      req.body.quantity;
  const notes =         req.body.notes;
  
  const queryString = String.raw`
  WITH new_order AS (
    INSERT INTO orders (
      status_id,
      tracking_link,
      name,
      number,
      link,
      category,
      material,
      supplier,
      price,
      quantity,
      notes
    )
    SELECT 
      $1::integer,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9::money,
      $10::integer,
      $11
    RETURNING id
  )
  
  INSERT INTO changes (
    order_id,
    old_status_id,
    new_status_id,
    datetime
  )
  SELECT 
    n.id,
    0,
    $1::integer,
    now()
  FROM new_order n
  RETURNING id
  ;`;
  
  pgQuery(queryString, [status_id,
                        tracking_link,
                        name,
                        number,
                        link,
                        category,
                        material,
                        supplier,
                        price,
                        quantity,
                        notes], (err, result) => {
    util.log(`error: ${err}`);
    if (err) {
      util.log("sending failure");
      res.status(500).json({err, submitted: false});
    } else {
      util.log(`result: ${result.rows}`);
      util.log(JSON.stringify(result.rows));
      res.status(200).json({id: result.rows[0].id, submitted: true});
    }
  });
});

// Update
app.put(`/orders/${password}`, (req, res) => {
  if (req.body.password === password) {
    // skierTerms.push(req.body);
    // res.json(skierTerms);
  }
});


// app.delete("/orders-api/:id", function(req, res) {
  // skierTerms = skierTerms.filter(function(definition) {
    // return definition.id !== req.params.id;
  // });
  // res.json(skierTerms);
// });

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
