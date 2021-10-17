const express = require('express');
// const mysql = require('mysql');
const app = express.Router();
const bcrypt = require('bcrypt');
// const pool = require('../config/dbConnection.js');
const restaurantModel = require('../Models/Restaurant.js');
const customerModel = require('../Models/Customer.js');

app.post('/login', async (req, res) => {
    console.log('req.body ', req.body);

    try {
        let result;
        if(req.body.isRestaurant) {
            result = await restaurantModel.findOne({email: req.body.email});
        }
        else {
            result = await customerModel.findOne({email: req.body.email});
        }

        let isPasswordMatch = await bcrypt.compare(req.body.password, result.password);
        if(isPasswordMatch) {
            console.log(result);

            res.cookie('cookie', result.email, {
                maxAge: 360000,
                httpOnly: false,
                path: '/'
            });
            console.log("req.session.email " + req.session.email);

            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Login successful");
        }
        else {
            console.log('Error ', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            console.log('Passwords do not match');
            res.end('Passwords do not match');
        }
    }
    catch(err) {
        console.log(err);
        res.writeHead(400, {
            'Content-type': 'text/plain'
        });
        res.end("Error in query execution in finding restaurant from DB ");
    }
    
    // pool
    //     .catch((err) => {
    //         console.log('Error in creating pool ' + err);
    //         res.writeHead(500, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error while creating pool");
    //     })
    //     .then(conn => {
    //         console.log('Pool created');
    //         dbConn = conn;
    //         let result;
    //         if(req.body.isRestaurant) {
    //             result = dbConn.query(`SELECT password 
    //                                     FROM Restaurant
    //                                     WHERE email= ${mysql.escape(req.body.email)}`);
    //         }
    //         else {
    //             result = dbConn.query(`SELECT password
    //                                     FROM Customer
    //                                     WHERE email= ${mysql.escape(req.body.email)}`);
    //         }
    //         return result;
    //     })
    //     .catch((err) => {
    //         console.log('Error in query execution in password retrieval from DB ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution in password retrieval from DB ");
    //     })
    //     // .then(result => {
    //     //     console.log(result[0].password);
    //     //     return bcrypt.hash(req.body.password, 10);
    //     // })
    //     .then(result => {
    //         if(result.length === 0) {
    //             res.writeHead(402, {
    //                 'Content-type': 'text/plain'
    //             });
    //             console.log("Invalid credentials db");
    //             res.end("Invalid credentials");
    //         }
    //         let passwordFromDB = result[0].password;
    //         // console.log('hashed pass ', result);
    //         // console.log(passwordFromDB);
    //         let isPasswordMatch = bcrypt.compare(req.body.password, passwordFromDB);
    //         return isPasswordMatch;
    //     })
    //     .catch((err) => {
    //         console.log('Error in query execution in password check ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution in password check ");
    //     })
    //     .then(isPasswordMatch => {
    //         if (isPasswordMatch === false) {
    //             res.writeHead(402, {
    //                 'Content-type': 'text/plain'
    //             });
    //             console.log("Invalid credentials db");
    //             res.end("Invalid credentials");
    //         } 

    //         let queryResult;
    //         console.log("req.body.isRestaurant ", req.body.isRestaurant);
    //         if(req.body.isRestaurant) {
    //             queryResult = dbConn.query(`SELECT * 
    //                                     FROM Restaurant AS R JOIN Address AS A ON R.email=A.email
    //                                     WHERE R.email= ${mysql.escape(req.body.email)}`);
    //         }
    //         else {
    //             queryResult = dbConn.query(`SELECT * 
    //                                     FROM Customer AS C JOIN Address AS A ON C.email=A.email
    //                                     WHERE C.email= ${mysql.escape(req.body.email)}`);
    //         }
    //         return queryResult;
    //     })
    //     .catch((err) => {
    //         console.log('Error in query execution ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution");
    //     })
    //     .then((queryResult) => {
    //         console.log("queryResult ", queryResult);
            
    //             console.log(queryResult);
    //             console.log("local Storage: ", req.session.email);

    //             res.cookie('cookie', queryResult[0].email, {
    //                 maxAge: 360000,
    //                 httpOnly: false,
    //                 path: '/'
    //             });
    //             // console.log("res.cookie ",res.cookie);

    //             req.session.email = queryResult[0].email;
    //             console.log("req.session.email " + req.session.email);
    //             res.writeHead(200, {
    //                 'Content-type': 'text/plain'
    //             });

    //             res.end(JSON.stringify(queryResult[0]));
    //             console.log("Login successful");

    //     })
});

module.exports = app;