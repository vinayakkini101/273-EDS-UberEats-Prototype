const express = require('express');
const app = express.Router();
const Order = require('../Models/Order.js');
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/addOrder', checkAuth, (req, res) => {;
    // req.body.orderDateTime =  new Date(req.body.orderDateTime).toISOString().slice(0, 19).replace('T', ' ');
    console.log('addorder req.body ',req.body);

    kafka.make_request('add_order', req.body, function (err, results) {
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

    // const orderedDishes = [];
    // for(let item of req.body.cartItems) {
    //     orderedDishes.push({
    //         dishName: item.dishName,
    //         price: item.price,
    //         quantity: item.quantity,
    //         dishImage: item.dishImage
    //     });
    // }

    // const newOrder = new Order({
    //     userEmail: req.body.userEmail,
    //     dateTime: req.body.orderDateTime,
    //     address: req.body.combinedSelectedAddress,
    //     status: 'New',
    //     userName: req.body.userName,
    //     restaurantName: req.body.cartItems[0].restaurantName,
    //     orderedDishes: orderedDishes
    // })

    // newOrder.save((err, result) => {
    //     if(err) {
    //         console.log('Error in query execution (saving order)' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end('Error in query execution (saving order)');
    //     }
    //     else {
    //         console.log("result ", result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end();
    //         console.log('order added successfully');
    //     }
    // });
});

module.exports = app;