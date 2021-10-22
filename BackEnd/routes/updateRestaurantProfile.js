const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');

app.post('/updateRestaurantProfile', (req, res) => {
    console.log('req.body ', req.body);

    Restaurant.updateOne({
        email: req.body.currentEmail
    }, {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        contactNumber: req.body.name.contactno,
        startTime: req.body.name.starttime,
        endTime: req.body.name.endtime,
        profilePicture: req.body.imageName,
        pickup: req.body.pickup,
        delivery: req.body.delivery,
        veg: req.body.veg,
        nonVeg: req.body.nonveg,
        vegan: req.body.vegan
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution in restaurant details update ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution in restaurant details update ");
        }
        else {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Restaurant details updated successfully");
        }
    })
});

module.exports = app;