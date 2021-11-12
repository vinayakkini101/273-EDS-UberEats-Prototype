const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/getRestaurantProfile', checkAuth, (req, res) => {
    console.log('req.body ', req.body);
    
    kafka.make_request('get_restaurant_profile', req.body, function (err, results) {
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {
          console.log("Inside router post");
          console.log(results);
          res.status(200).send(results);
        }
    });

    // Restaurant.findOne({
    //     email: req.body.restaurantEmail
    // }, (err, result) => {
    //     if(err) {
    //         console.log('Error in getting restaurant profile ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in getting restaurant profile");
    //     }
    //     else {
    //         console.log('result ', result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result));
    //         console.log("Restaurant details fetched successfully");
    //     }
    // })
});

module.exports = app;