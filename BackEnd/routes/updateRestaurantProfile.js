const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/updateRestaurantProfile', (req, res) => {
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
            queryResult = dbConn.query(`UPDATE Restaurant 
                                        SET
                                            name = ${mysql.escape(req.body.name)},
                                            email = ${mysql.escape(req.body.email)},
                                            description = ${mysql.escape(req.body.description)},
                                            contact_number = ${mysql.escape(req.body.contactno)},
                                            start_time = ${mysql.escape(req.body.starttime)},
                                            end_time = ${mysql.escape(req.body.endtime)},
                                            Display_Picture=${mysql.escape(req.body.imageLink)},
                                            pickup = ${mysql.escape(req.body.pickup)},
                                            delivery = ${mysql.escape(req.body.delivery)},
                                            veg = ${mysql.escape(req.body.veg)},
                                            nonveg = ${mysql.escape(req.body.nonveg)},
                                            vegan = ${mysql.escape(req.body.vegan)}
                                        WHERE 
                                            email=${mysql.escape(req.body.currentEmail)}
                                    `);
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution in restaurant details update ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution in restaurant details update ");
        })
        .then((queryResult) => {
            let result;
            result = dbConn.query(`UPDATE Address 
                                        SET
                                            email=${mysql.escape(req.body.email)}
                                        WHERE 
                                            email=${mysql.escape(req.body.currentEmail)}
                                    `);
            return result;
        })
        .catch((err) => {
            console.log('Error in query execution in restaurant details update ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution in restaurant details update ");
        })
        .then((result) => {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result[0]));
            console.log("Restaurant details updated successfully");
        })
});

module.exports = app;