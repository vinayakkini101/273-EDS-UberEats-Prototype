const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/updateRestaurantAddress', (req, res) => {
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
            let result;
            dbConn = conn;
            result = dbConn.query(`UPDATE Address 
                                        SET
                                            country = ${mysql.escape(req.body.country)},
                                            state = ${mysql.escape(req.body.state)},
                                            city = ${mysql.escape(req.body.city)},
                                            streetAddress = ${mysql.escape(req.body.updatedStreet)}
                                        WHERE 
                                            email=${mysql.escape(req.body.currentEmail)}
                                            AND
                                            streetAddress = ${mysql.escape(req.body.currentStreet)}
                                    `);
            return result;
        })
        .catch((err) => {
            console.log('Error in query execution in Restaurant address update ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution in Restaurant address update");
        })
        .then((result) => {
            console.log("queryResult ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result[0]));
            console.log("Restaurant address updated successfully");
        })
});

module.exports = app;