const express = require('express');
const app = express.Router();
const Order = require('../Models/Order.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/getOrders', checkAuth, async (req, res) => {
    console.log('req.query ', req.query);

    let result;

    try{
        if(req.body.customerEmail) {
            result = await Order.find({email: req.body.customerEmail});
        }
        else {
            result = await Order.find({email: req.body.restaurantName});
        }

        console.log('orders list ', result);
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });

        res.end(JSON.stringify(result));
        console.log("Order retrieval successful");
    }
    catch(err) {
        console.log('Error in query execution (getting the orders)' + err);
        res.writeHead(400, {
            'Content-type': 'text/plain'
        });
        res.end("Error in query execution (getting the orders)");
    }
});

module.exports = app;