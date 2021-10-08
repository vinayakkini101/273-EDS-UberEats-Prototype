const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/getOrderStatus', (req, res) => {
    console.log(req.body);
    let dbConn = null;

    pool
        .catch((err) => {
            console.log('Error in creating pool ' + err);
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error while creating pool");
        })
        .then((conn) => {
            console.log('Pool created');
            dbConn = conn;
            let queryResult;
            queryResult = dbConn.query(`SELECT status 
                                        FROM Orders
                                        WHERE 
                                            userEmail=${mysql.escape(req.body.userEmail)}
                                            AND
                                            dateTime=${mysql.escape(req.body.orderDateTime)}
                                    `);
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        })
        .then((result) => {
            console.log("queryResult ", result[0]);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result[0]));
            console.log("status retrieved successfully");
        })
});

module.exports = app;