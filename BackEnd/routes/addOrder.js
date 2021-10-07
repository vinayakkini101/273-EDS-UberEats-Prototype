const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/addOrder', (req, res) => {;
    // req.body.orderDateTime =  new Date(req.body.orderDateTime).toISOString().slice(0, 19).replace('T', ' ');
    console.log('addorder ',req.body);
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
            queryResult = dbConn.query(`INSERT INTO Orders (
                                            userEmail,
                                            userName,
                                            restaurantName,
                                            address,
                                            dateTime,
                                            status
                                        )
                                        VALUES (
                                            ${mysql.escape(req.body.userEmail)},
                                            ${mysql.escape(req.body.userName)},
                                            ${mysql.escape(req.body.cartItems[0].restaurantName)},
                                            ${mysql.escape(req.body.combinedSelectedAddress)},
                                            ${mysql.escape(req.body.orderDateTime)},
                                            'New'
                                        )`
            );
            return queryResult;
        })
        .catch(error => {
            console.log('add order insert to Orders error ',error);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        })
        .then((prevResult) => {
            let queryResult;
            let sqlString = `INSERT INTO OrderedDishes (userEmail, orderDateTime, dishName,
                                        price, quantity, dishImage) VALUES `;
            for(let item of req.body.cartItems) {
                sqlString += `(
                    ${mysql.escape(req.body.userEmail)},
                    ${mysql.escape(req.body.orderDateTime)},
                    ${mysql.escape(item.dishName)},
                    ${mysql.escape(item.price)},
                    ${mysql.escape(item.quantity)},
                    ${mysql.escape(item.dishImage)}
                ),`;
            }
            sqlString = sqlString.slice(0, sqlString.length-1);
            console.log('sqlString ', sqlString);
            
            queryResult = dbConn.query(sqlString);

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
            console.log("order added successfully");
        })
});

module.exports = app;