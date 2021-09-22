const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/deleteDish', (req, res) => {
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
            queryResult = conn.query(`DELETE FROM Dish 
                                        WHERE Restaurant_Email=${mysql.escape(req.body.restaurantEmail)} 
                                        AND
                                        Dish_Code=${mysql.escape(req.body.dishcode)}`);
            // (
            //     Restaurant_Email,
            //     Dish_Name,
            //     Ingredients,
            //     Description,
            //     Category,
            //     Price
            // )
            // VALUES (
            //     ${mysql.escape(req.body.restaurantEmail)},
            //     ${mysql.escape(req.body.dishname)},
            //     ${mysql.escape(req.body.ingredients)},
            //     ${mysql.escape(req.body.description)},
            //     ${mysql.escape(req.body.category)},
            //     ${mysql.escape(req.body.price)}
            // )`)

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
            console.log("Dish deleted successfully");
        })
});

module.exports = app;