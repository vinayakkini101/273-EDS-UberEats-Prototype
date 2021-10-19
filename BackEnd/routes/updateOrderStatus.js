const express = require('express');
const app = express.Router();
const Order = require('../Models/Order.js');

app.post('/updateOrderStatus', (req, res) => {
    console.log('req.body ', req.body);

    Order.updateOne({
        userEmail: req.body.userEmail,
        dateTime: req.body.orderDateTime
    }, {
        status: req.body.newStatus
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution (update order status)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (update order status)");
        }
        else {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Order status updated successfully");
        }
    })
});

module.exports = app;