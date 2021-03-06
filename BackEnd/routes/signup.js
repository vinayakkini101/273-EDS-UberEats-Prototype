const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/dbConnection.js');

app.post('/signup', (req, res) => {
    console.log(req.body);
    let dbConn;

    pool
        .catch((err) => {
            console.log('Error in creating pool ' + err);
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error while creating pool");
        })
        .then(conn => {
            console.log('Pool created');
            dbConn = conn;
            let saltRounds = 10;
            return bcrypt.hash(req.body.password, saltRounds);
        })
        .then(hash => {
            let queryResult;
            // console.log("localStorage.isRestaurant ", localStorage.getItem("isRestaurant"));
            if(req.body.isRestaurant) {
                queryResult = dbConn.query(`INSERT INTO Restaurant (
                    Name,
                    Description,
                    Email,
                    Contact_Number,
                    Start_Time,
                    End_Time,
                    password
                )
                VALUES (
                    ${mysql.escape(req.body.name)},
                    ${mysql.escape(req.body.description)},
                    ${mysql.escape(req.body.email)},
                    ${mysql.escape(req.body.contactno)},
                    ${mysql.escape(req.body.starttime)},
                    ${mysql.escape(req.body.endtime)},
                    ${mysql.escape(hash)}
                )`);
            }
            else {
                queryResult = dbConn.query(`INSERT INTO Customer (
                    email,
                    name,
                    about,
                    nickname,
                    dob,
                    contact_number,
                    password
                )
                VALUES (
                    ${mysql.escape(req.body.email)},
                    ${mysql.escape(req.body.name)},
                    ${mysql.escape(req.body.about)},
                    ${mysql.escape(req.body.nickname)},
                    ${mysql.escape(req.body.dob)},
                    ${mysql.escape(req.body.contactno)},
                    ${mysql.escape(hash)}
                )
            `);
            }
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (insert in customer/restaurant)");
        })
        .then(() => {
            result = dbConn.query(`INSERT INTO Address (
                    email,
                    streetAddress,
                    city,
                    state,
                    country
                )
                VALUES (
                    ${mysql.escape(req.body.email)},
                    ${mysql.escape(req.body.street)},
                    ${mysql.escape(req.body.city)},
                    ${mysql.escape(req.body.state)},
                    ${mysql.escape(req.body.country)}
                )
            `);
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (insert in address)");
        })
        .then(() => {
            // console.log("queryResult ", queryResult);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            console.log("Signup successful");
            res.end('Signup successful');
        })
});

module.exports = app;