const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/getRestaurantProfile', (req, res) => {
    console.log(req.body);
    let restaurantDetails = null;
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
            queryResult = dbConn.query(`SELECT * FROM Restaurant 
                                        WHERE email=${mysql.escape(req.body.restaurantEmail)}`);
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        })
        .then((queryResult) => {
            let result;
            result = dbConn.query(`SELECT * FROM Address 
                                        WHERE email=${mysql.escape(req.body.restaurantEmail)}`);
            restaurantDetails = queryResult;
            return result;
        })
        .catch((err) => {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        })
        .then((result) => {
            console.log('result from address ',result);
            restaurantDetails[0].street = result[0].streetAddress;
            restaurantDetails[0].city = result[0].city;
            restaurantDetails[0].state = result[0].state;
            restaurantDetails[0].country = result[0].country;
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(restaurantDetails[0]));
            console.log("Restaurant details fetched successfully");
        })
});

module.exports = app;