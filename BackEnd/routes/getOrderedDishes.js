const express = require('express');
const app = express.Router();
const Order = require('../Models/Order.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/getOrderedDishes', checkAuth, (req, res) => {
    console.log('getOrderedDishes req.body ', req.body);

    Order.findOne({
        userEmail: req.body.userEmail,
        dateTime: req.body.orderDateTime
    },
    'orderedDishes',
    (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the ordered dishes)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (getting the ordered dishes)");
        }
        else {
            console.log('dish list result ', result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Ordered dishes retrieval successful");
        }
    })
});

module.exports = app;