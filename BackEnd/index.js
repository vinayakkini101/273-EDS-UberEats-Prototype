var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');

app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
var constants = require('./config.json');
const { everySeries } = require('async');

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});

app.use(cors({ origin: constants.frontEnd, credentials: true}));

app.use(session({
    secret: 'UberEatsClone',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

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


app.get('/', function(req, res) {
    res.redirect('/welcome');
});

app.all('/welcome', function(req, res) {
    res.render('welcome.ejs');
});

app.get('/RestaurantLogin', function(req, res) {
    if(req.session.user) {
        res.redirect('/RestaurantHome');
    }
    else {
        res.render('RestaurantLogin.ejs');
    }
});

// app.post('/RestaurantLogin', function(req, res) {
//     if(req.session.user) {
//         res.redirect('/RestaurantHome');
//     }
//     else {

//         res.render('RestaurantLogin.ejs');
//     }
// });

app.post('/RestaurantSignUp', function(req, res) {
    if(req.session.user) {
        res.redirect('/RestaurantHome');
    }
    else {
        console.log(req.body);
        // await connection.query('SELECT * FROM test_table', async function (error, results) {
        //     if(error) {
        //         res.writeHead(200, {
        //             'Content-Type': 'text/plain'
        //         });
        //         res.end(error.code);
        //     }
        //     else {
        //         res.writeHead(200, {
        //             'Content-Type': 'text/plain'
        //         });
        //         res.end(JSON.stringify(results));
        //     }
        // });
        res.render('RestaurantLogin.ejs');
    }
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



