const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/addFavourite', checkAuth, (req, res) => {;
    console.log('req.body ', req.body);

    kafka.make_request('add_favourite', req.body, function (err, results) {
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

    // Customer.updateOne({
    //     email: req.body.favourite.userEmail
    // }, {
    //     $addToSet: {
    //         favourites: {
    //             name: req.body.favourite.restaurantName,
    //             email: req.body.favourite.restaurantEmail,
    //             city: req.body.favourite.restaurantCity,
    //             state: req.body.favourite.restaurantState,
    //             profilePicture: req.body.favourite.restaurantPicture
    //         }
    //     }
    // }, (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution (adding favourite)' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in adding favourite");
    //     }
    //     else {
    //         console.log('result ', result);
    //         res
    //             .writeHead(200, {
    //                 'Content-Type': 'text/plain'
    //             })
    //             .end();
    //     }
    // })
});

module.exports = app;