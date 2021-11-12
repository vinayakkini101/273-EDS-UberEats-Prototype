const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/updateRestaurantProfile', checkAuth, (req, res) => {
    console.log('req.body ', req.body);

    kafka.make_request('update_restaurant_profile', req.body, function (err, results) {
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

    // Restaurant.updateOne({
    //     email: req.body.currentEmail
    // }, {
    //     name: req.body.name,
    //     email: req.body.email,
    //     description: req.body.description,
    //     contactNumber: req.body.name.contactno,
    //     startTime: req.body.name.starttime,
    //     endTime: req.body.name.endtime,
    //     profilePicture: req.body.imageName,
    //     pickup: req.body.pickup,
    //     delivery: req.body.delivery,
    //     veg: req.body.veg,
    //     nonVeg: req.body.nonveg,
    //     vegan: req.body.vegan
    // }, (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution in restaurant details update ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution in restaurant details update ");
    //     }
    //     else {
    //         console.log("result ", result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result));
    //         console.log("Restaurant details updated successfully");
    //     }
    // })
});

module.exports = app;