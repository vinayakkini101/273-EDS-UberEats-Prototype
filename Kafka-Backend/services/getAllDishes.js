const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    let query = {};
    if(msg.restaurantEmail) {
        query = {email: msg.restaurantEmail};
    }

    Restaurant.find(
        query,
        (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the dishes)' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution");
            callback(err, 'Error in query execution');
        }
        else {
            console.log('dish list result ', result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result));
            callback(null, JSON.stringify(result));
            console.log("Dish retrieval successful");
        }
    })
};

exports.handle_request = handle_request;