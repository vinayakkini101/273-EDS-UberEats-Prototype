const express = require('express');
const app = express.Router();
const Order = require('../Models/Order.js');

app.post('/addOrder', (req, res) => {;
    // req.body.orderDateTime =  new Date(req.body.orderDateTime).toISOString().slice(0, 19).replace('T', ' ');
    console.log('addorder req.body ',req.body);

    const orderedDishes = [];
    for(let item of req.body.cartItems) {
        orderedDishes.push({
            dishName: item.dishName,
            price: item.price,
            quantity: item.quantity,
            dishImage: item.dishImage
        });
    }

    const newOrder = new Order({
        userEmail: req.body.userEmail,
        dateTime: req.body.orderDateTime,
        address: req.body.combinedSelectedAddress,
        status: 'New',
        userName: req.body.userName,
        restaurantName: req.body.cartItems[0].restaurantName,
        orderedDishes: orderedDishes
    })

    newOrder.save((err, result) => {
        if(err) {
            console.log('Error in query execution (saving order)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in query execution (saving order)');
        }
        else {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end();
            console.log('order added successfully');
        }
    });
});

module.exports = app;