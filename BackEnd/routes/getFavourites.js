const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.post('/getFavourites', (req, res) => {
    console.log('getFavourites backend ',req.body);
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
            console.log('user email id from body ', req.body.userEmail);
            // let restaurantID = result[0].Restaurant_ID;
            let queryResult;
            queryResult = dbConn.query(`SELECT * from Favourites WHERE userEmail=${mysql.escape(req.body.userEmail)}`);
            
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution (getting the favourites)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        })
        .then((queryResult) => {
            console.log('favourites list ', queryResult);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(queryResult));
            console.log("Favourites retrieval successful");
        })
});

module.exports = app;