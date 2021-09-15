var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mysql = require('mysql');

app.set('view engine', 'ejs');
var constants = require('./config.json');
const { everySeries } = require('async');

app.use(cors({ origin: constants.frontEnd, credentials: true}));

app.use(session({
    secret: 'UberEatsClone',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.setHeader('Access-Control-Origin', constants.frontEnd);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Methods', 'GET,HEAD,POST,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Accept');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var connection = mysql.createPool({
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database
});

connection.getConnection((err) => {
    if(err) {
        throw 'Error occured: ' + err;
    }
    console.log("pool created");
});

app.get('/test-api', async function(req, res) {
    await connection.query('SELECT * FROM test_table', async function (error, results) {
        if(error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(results));
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening at port 3000');
})

