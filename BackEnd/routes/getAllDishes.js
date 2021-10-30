const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');
const { checkAuth } = require('../Utils/auth.js');

app.get('/getAllDishes', checkAuth, (req, res) => {
    console.log('getalldishes req.body ', req.query);

    let query = {};
    if(req.query.restaurantEmail) {
        query = {email: req.query.restaurantEmail};
    }

    Restaurant.find(
        query,
        (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the dishes)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        }
        else {
            console.log('dish list result ', result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Dish retrieval successful");
        }
    })
});

module.exports = app;