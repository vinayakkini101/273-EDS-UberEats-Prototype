const express = require('express');
const app = express.Router();
// const Order = require('../Models/Order.js');
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/getOrders', checkAuth, async (req, res) => {
    console.log('req.body ', req.body);

    kafka.make_request('get_orders', req.body, function (err, results) {
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

    // let result;

    // try{
    //     if(req.body.userEmail) {
    //         result = await Order.find({userEmail: req.body.userEmail});
    //     }
    //     else {
    //         result = await Order.find({restaurantName: req.body.restaurantName});
    //     }

    //     console.log('orders list ', result);
    //     res.writeHead(200, {
    //         'Content-type': 'text/plain'
    //     });

    //     res.end(JSON.stringify(result));
    //     console.log("Order retrieval successful");
    // }
    // catch(err) {
    //     console.log('Error in query execution (getting the orders)' + err);
    //     res.writeHead(400, {
    //         'Content-type': 'text/plain'
    //     });
    //     res.end("Error in query execution (getting the orders)");
    // }
});

module.exports = app;