const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/getCustomerAddresses', (req, res) => {
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
            console.log('Pool created');
            let queryResult;
            queryResult = conn.query(`SELECT * 
                                        FROM Customer AS C JOIN Address AS A
                                        ON C.email=A.email
                                        WHERE C.email=${mysql.escape(req.body.customerEmail)}`);
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (fetching from Customer)");
        })
        .then((queryResult) => {
            console.log('queryResult ',queryResult);
            // console.log("customerDetails ", customerDetails);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(queryResult));
            console.log("Customer address details fetched successfully");
        })
});

module.exports = app;