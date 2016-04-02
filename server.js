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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    util.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static("./public"));

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
        ) changed
    FROM orders o
    ;`;
    
    pgQuery(queryString, [], (err, result) => {
        if (err) {
            res.status(500).json({err});
        } else {
            res.json(result.rows);
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
            res.json(result.rows);
        }
    });
});

// Create
app.post("/orders", (req, res) => {
    if (req.body.password === password) {
        // skierTerms.push(req.body);
        // res.json(skierTerms);
    }
});

// Update
app.put("/orders", (req, res) => {
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
