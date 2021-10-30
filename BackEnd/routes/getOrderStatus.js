const express = require('express');
const app = express.Router();
const Order = require('../Models/Order.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/getOrderStatus', checkAuth, (req, res) => {
    console.log('req.body ', req.body);

    Order.findOne({
        userEmail: req.body.userEmail,
        dateTime: req.body.orderDateTime
    },
    'status',
    (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the order status)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (getting the order status)");
        }
        else {
            console.log('order status result ', result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("status retrieved successfully");
        }
    })
});

module.exports = app;