const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/getCustomerProfile', (req, res) => {
    console.log(req.body);
    let customerDetails = null;
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
            queryResult = dbConn.query(`SELECT * FROM Customer 
                                        WHERE email=${mysql.escape(req.body.customerEmail)}`);
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
            let result;
            result = dbConn.query(`SELECT * FROM Address 
                                        WHERE email=${mysql.escape(req.body.customerEmail)}`);
            // console.log('queryResult from customer in next block', queryResult);    
            customerDetails = queryResult;
            return result;
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (fetching from Address)");
        })
        .then((result) => {
            console.log('result from address ',result);
            customerDetails[0].street = result[0].streetAddress;
            customerDetails[0].city = result[0].city;
            customerDetails[0].state = result[0].state;
            customerDetails[0].country = result[0].country;
            // console.log("customerDetails ", customerDetails);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(customerDetails[0]));
            console.log("Customer details fetched successfully");
        })
});

module.exports = app;