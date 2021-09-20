const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const pool = require('../config/dbConnection.js');

app.get('/getAllDishes', (req, res) => {
    console.log(req.query);
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
            // const restaurantEmail  = localStorage.getItem('userEmail');
            console.log('req body resto email ' + req.query.restaurantEmail);
            let result = conn.query(`SELECT Restaurant_ID from Restaurant WHERE email=${mysql.escape(req.query.restaurantEmail)}`);
            return result;
        })
        .catch((err) => {
            console.log('Error in query execution (getting the restaurant ID)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        })
        .then((result) => {
            console.log('restrnt id from query ', result);
            let restaurantID = result[0].Restaurant_ID;
            let queryResult;
            queryResult = dbConn.query(`SELECT * from Dish where Restaurant_ID= ${restaurantID}`);
            return queryResult;
        })
        .catch((err) => {
            console.log('Error in query execution (getting the dishes)' + err);
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
            console.log("Dish retrieval successful");
        })
});

module.exports = app;