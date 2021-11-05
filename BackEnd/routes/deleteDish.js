const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');
const { checkAuth } = require('../Utils/auth.js');
const mongoose = require('mongoose');

app.post('/deleteDish', checkAuth, (req, res) => {
    console.log('delete dish req.body ', req.body);
    let idToDelete = req.body.dishCode[0];
    Restaurant.updateOne({
        email: req.body.restaurantEmail,
    }, {
        $pull: {
            dishes: {dishCode: idToDelete}
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in dish deletion ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in dish deletion");
        }
        else {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(idToDelete));
            console.log("Dish deleted successfully");
        }
    })
});

module.exports = app;