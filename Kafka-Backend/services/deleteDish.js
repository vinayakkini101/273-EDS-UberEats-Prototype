const express = require('express');
const Restaurant = require('../Models/Restaurant.js');
const mongoose = require('mongoose');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    let idToDelete = msg.dishCode[0];
    Restaurant.updateOne({
        email: msg.restaurantEmail,
    }, {
        $pull: {
            dishes: {dishCode: idToDelete}
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in dish deletion ' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in dish deletion");
            callback(err);
        }
        else {
            console.log("result ", result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(idToDelete));
            console.log("Dish deleted successfully");
            callback(null, JSON.stringify(idToDelete));
        }
    })
};

exports.handle_request = handle_request;