const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/addToCart', (req, res) => {;
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
            queryResult = conn.query(`SELECT * 
                                        FROM Cart 
                                        WHERE 
                                            userEmail=${mysql.escape(req.body.userEmail)}
                                            AND
                                            restaurantEmail=${mysql.escape(req.body.restaurantEmail)}
                                            AND
                                            dishName=${mysql.escape(req.body.dishName)}`
            );
            return queryResult;
        })
        .catch(error => {
            console.log('get existing cart entry ',error);

        })
        .then((prevResult) => {
            let queryResult;
            if(prevResult.length > 0) {
                queryResult = dbConn.query(`UPDATE Cart 
                                        SET
                                            quantity=${mysql.escape(req.body.quantity)}
                                        WHERE 
                                        userEmail=${mysql.escape(req.body.userEmail)}
                                            AND
                                            restaurantEmail=${mysql.escape(req.body.restaurantEmail)}
                                            AND
                                            dishName=${mysql.escape(req.body.dishName)}`
                );
            }
            else {
                queryResult = dbConn.query(`INSERT INTO Cart (
                                                userEmail,
                                                restaurantEmail,
                                                dishName,
                                                quantity,
                                                price
                                            )
                                            VALUES (
                                                ${mysql.escape(req.body.userEmail)},
                                                ${mysql.escape(req.body.restaurantEmail)},
                                                ${mysql.escape(req.body.dishName)},
                                                ${mysql.escape(req.body.quantity)},
                                                ${mysql.escape(req.body.price)}
                                            )`
                );
            }

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
            console.log("queryResult ", queryResult);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end();
            console.log("cart item added/updated successfully");
        })
});

module.exports = app;