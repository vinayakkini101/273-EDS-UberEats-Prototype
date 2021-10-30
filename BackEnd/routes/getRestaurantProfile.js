const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/getRestaurantProfile', checkAuth, (req, res) => {
    console.log('req.body ', req.body);
    
    Restaurant.findOne({
        email: req.body.restaurantEmail
    }, (err, result) => {
        if(err) {
            console.log('Error in getting restaurant profile ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in getting restaurant profile");
        }
        else {
            console.log('result ', result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Restaurant details fetched successfully");
        }
    })
});

module.exports = app;