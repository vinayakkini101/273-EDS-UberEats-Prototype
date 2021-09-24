const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/updateCustomerProfile', (req, res) => {
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
            queryResult = conn.query(`UPDATE Customer 
                                        SET
                                            name = ${mysql.escape(req.body.name)},
                                            email = ${mysql.escape(req.body.email)},
                                            about = ${mysql.escape(req.body.about)},
                                            contact_number = ${mysql.escape(req.body.contactno)},
                                            nickname = ${mysql.escape(req.body.nickname)},
                                            dob = ${mysql.escape(req.body.dob)},
                                            country = ${mysql.escape(req.body.country)},
                                            state = ${mysql.escape(req.body.state)},
                                            city = ${mysql.escape(req.body.city)},
                                            profile_picture = ${mysql.escape(req.body.imageLink)}
                                        WHERE 
                                            email=${mysql.escape(req.body.email)}
                                    `);
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

            res.end(JSON.stringify(queryResult[0]));
            console.log("Customer details updated successfully");
        })
});

module.exports = app;