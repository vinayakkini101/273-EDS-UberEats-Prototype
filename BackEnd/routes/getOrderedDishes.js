const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/getOrderedDishes', checkAuth, (req, res) => {
    console.log('getOrderedDishes req.body ', req.body);

    kafka.make_request('get_ordered_dishes', req.body, function (err, results) {
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

    // Order.findOne({
    //     userEmail: req.body.userEmail,
    //     dateTime: req.body.orderDateTime
    // },
    // 'orderedDishes',
    // (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution (getting the ordered dishes)' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution (getting the ordered dishes)");
    //     }
    //     else {
    //         console.log('dish list result ', result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result));
    //         console.log("Ordered dishes retrieval successful");
    //     }
    // })
});

module.exports = app;