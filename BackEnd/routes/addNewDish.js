const express = require('express');
const app = express.Router();
const { upload } = require('./uploadDownload.js');
const Restaurant = require('../Models/Restaurant.js');
const { checkAuth } = require('../Utils/auth.js');
const mongoose = require('mongoose');
// upload.array('photos', 5)
app.post('/addNewDish', checkAuth, (req, res) => {;
    console.log('req.body ', req.body);
    let dishCode = new mongoose.Types.ObjectId().toString() + new Date().toISOString();
    console.log('new dishCode ', dishCode);
    Restaurant.updateOne({
        email: req.body.restaurantEmail
    }, {
        $addToSet: {
            dishes: {
                dishCode: dishCode,
                dishName: req.body.dishname,
                ingredients: req.body.ingredients,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                imageLink: req.body.imageLink
            }
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in adding dish ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in adding dish");
        }
        else {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(dishCode));
            console.log("Dish added successfully");
        }
    });
});

module.exports = app;