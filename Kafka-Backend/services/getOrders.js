// const express = require('express');
// const app = express.Router();
const Order = require('../Models/Order.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    let result;
    try{
        if(msg.userEmail) {
            result = await Order.find({userEmail: msg.userEmail});
        }
        else {
            result = await Order.find({restaurantName: msg.restaurantName});
        }

        console.log('orders list ', result);
        // res.writeHead(200, {
        //     'Content-type': 'text/plain'
        // });

        // res.end(JSON.stringify(result));
        console.log("Order retrieval successful");
        callback(null, result);
    }
    catch(err) {
        console.log('Error in query execution (getting the orders)' + err);
        // res.writeHead(400, {
        //     'Content-type': 'text/plain'
        // });
        // res.end("Error in query execution (getting the orders)");
        callback(err);
    }
}

exports.handle_request = handle_request;
