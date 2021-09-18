const express = require('express');
var mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/login', (req, res) => {
    console.log(req.body);

    pool
        .catch((err) => {
            console.log('Error in creating pool ' + err);
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error while creating pool");
        })
        .then((conn) => {
            console.log('Pool created')
            let queryResult = conn.query(`SELECT * from Restaurant where Email= ${mysql.escape(req.body.email)}`);
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Invalid credentials");
        })
        .then((queryResult) => {
            if (queryResult.length == 0 || req.body.password !== queryResult[0].password) {
                res.writeHead(402, {
                    'Content-type': 'text/plain'
                });
                console.log("Invalid credentials db");
                res.end("Invalid credentials");
            } else {
                console.log(queryResult);
                console.log("local Storage: ", req.session.email);

                res.cookie('cookie', queryResult[0].Email, {
                    maxAge: 360000,
                    httpOnly: false,
                    path: '/'
                });
                console.log("res.cookie ",res.cookie);

                req.session.email = queryResult[0].Email;
                console.log("req.session.email " + req.session.email);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });

                res.end(JSON.stringify(queryResult[0]));
                console.log("Login successful");
            }
        })
    /*
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("Error while connecting to database");
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error while connecting to database");
        } else {

            //query
            const sql = `SELECT * from Restaurant where Email= ${mysql.escape(req.body.email)} `;
            console.log(sql);

            conn.query(sql, (err, result) => {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end("Invalid credentials");
                } else {
                    if (result.length == 0 || req.body.password !== result[0].password) {//|| !bcrypt.compareSync(req.body.userPassword, result[0].userPassword))
                        res.writeHead(402, {
                            'Content-type': 'text/plain'
                        });
                        console.log("Invalid credentials db");
                        res.end("Invalid credentials");
                    } else {
                        console.log(result);
                        console.log("local Storage: ", req.session.email);

                        res.cookie('cookie', result[0].Email, {
                            maxAge: 360000,
                            httpOnly: false,
                            path: '/'
                        });
                        console.log("res.cookie ",res.cookie);

                        req.session.email = result[0].Email;
                        console.log("req.session.email " + req.session.email);
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        });

                        res.end(JSON.stringify(result[0]));
                        console.log("Login successful");
                    }
                }
            });
        }
    });
    */
});

module.exports = app;