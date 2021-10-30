const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/deleteDish', checkAuth, (req, res) => {
    console.log('delete dish req.body ', req.body);

    Restaurant.updateOne({
        email: req.body.restaurantEmail,
    }, {
        $pull: {
            dishes: {dishCode: req.body.dishCode[0]}
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

            res.end();
            console.log("Dish deleted successfully");
        }
    })
});

module.exports = app;