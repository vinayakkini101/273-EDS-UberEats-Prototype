const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');

app.get('/getAllDishes', (req, res) => {
    console.log('req.body ', req.query);
    // let dbConn;

    Restaurant.findOne({
        email: req.query.restaurantEmail
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the dishes)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        }
        else {
            console.log('dish list result ', result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Dish retrieval successful");
        }
    })

    // pool
    //     .catch((err) => {
    //         console.log('Error in creating pool ' + err);
    //         res.writeHead(500, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error while creating pool");
    //     })
    //     .then((conn) => {
    //         console.log('Pool created');
    //         dbConn = conn;
    //         console.log('restrnt id from query ', req.query.restaurantEmail);
    //         // let restaurantID = result[0].Restaurant_ID;
    //         let queryResult;
    //         if(req.query.restaurantEmail) {
    //             queryResult = dbConn.query(`SELECT * from Dish WHERE Restaurant_Email=${mysql.escape(req.query.restaurantEmail)}`);
    //         }
    //         else {
    //             queryResult = dbConn.query(`SELECT * from Dish`);
    //         }
            
    //         return queryResult;
    //     })
    //     .catch((err) => {
    //         console.log('Error in query execution (getting the dishes)' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution");
    //     })
    //     .then((queryResult) => {
    //         console.log('dish list ', queryResult);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(queryResult));
    //         console.log("Dish retrieval successful");
    //     })
});

module.exports = app;