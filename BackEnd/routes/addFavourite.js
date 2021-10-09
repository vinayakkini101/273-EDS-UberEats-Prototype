const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/addFavourite', (req, res) => {;
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
            let queryResult;

            let sqlString = `INSERT INTO 
                            Favourites (userEmail, restaurantEmail) 
                            VALUES (
                                ${mysql.escape(req.body.favourite.userEmail)},
                                ${mysql.escape(req.body.favourite.restaurantEmail)}
                            )`;

            console.log('sqlString ', sqlString);

            queryResult = dbConn.query(sqlString);
            return queryResult;
        })
        .catch(error => {
            console.log('addFavourite error ',error);
        })
        .then((queryResult) => {
            console.log("queryResult ", queryResult);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end();
            console.log("favourite added successfully");
        })
});

module.exports = app;