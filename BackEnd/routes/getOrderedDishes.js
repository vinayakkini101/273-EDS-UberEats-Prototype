const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/getOrderedDishes', (req, res) => {
    console.log('getOrderedDishes ', req.body);
    let dbConn;

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
            // let restaurantID = result[0].Restaurant_ID;
            let queryResult;
            // if(req.body.isRestaurant) {
            //     queryResult = dbConn.query(`SELECT *
            //                             FROM OrderedDishes
            //                             WHERE restaurantName=${mysql.escape(req.body.restaurantName)}
            //     `);
            // }
            // else {
                queryResult = dbConn.query(`SELECT *
                                        FROM OrderedDishes
                                        WHERE 
                                            userEmail=${mysql.escape(req.body.userEmail)}
                                            AND
                                            orderDateTime=${mysql.escape(req.body.orderDateTime)}
            `);
            // }
            
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution (getting the ordere dishes)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        })
        .then((queryResult) => {
            console.log('dish list ', queryResult);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(queryResult));
            console.log("Ordered dishes retrieval successful");
        })
});

module.exports = app;