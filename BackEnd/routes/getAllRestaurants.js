const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');

app.post('/getAllRestaurants', (req, res) => {
    console.log('req.body ', req.body);

    Restaurant.find(
        {},
        (err, result) => {
            if(err) {
                console.log('Error in getting all restaurants ' + err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end("Error in getting all restaurants");
            }
            else {
                console.log("result ", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });

                res.end(JSON.stringify(result));
                console.log("All restaurant details fetched successfully");
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
    //         let queryResult;
    //         queryResult = conn.query(`SELECT * 
    //                                 FROM Restaurant AS R JOIN Address AS A ON R.email=A.email`);
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
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(queryResult));
    //         console.log("All restaurant details fetched successfully");
    //     })
});

module.exports = app;