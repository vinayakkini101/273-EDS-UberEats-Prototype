const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/getOrderStatus', checkAuth, (req, res) => {
    console.log('req.body ', req.body);

    kafka.make_request('get_order_status', req.body, function (err, results) {
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

    // Order.findOne({
    //     userEmail: req.body.userEmail,
    //     dateTime: req.body.orderDateTime
    // },
    // 'status',
    // (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution (getting the order status)' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution (getting the order status)");
    //     }
    //     else {
    //         console.log('order status result ', result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result));
    //         console.log("status retrieved successfully");
    //     }
    // })
});

module.exports = app;