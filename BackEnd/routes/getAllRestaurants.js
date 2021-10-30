const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/getAllRestaurants', checkAuth, (req, res) => {
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
});

module.exports = app;