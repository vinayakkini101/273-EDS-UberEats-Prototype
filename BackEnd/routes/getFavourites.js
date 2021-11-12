const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/getFavourites', checkAuth, (req, res) => {
    console.log('getFavourites req.body ',req.body);

    kafka.make_request('get_favourites', req.body, function (err, results) {
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

    // Customer.findOne({
    //     email: req.body.userEmail
    // }, 
    // 'favourites',
    // (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution (getting the favourites)' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution");
    //     }
    //     else {
    //         console.log('favourites list result', result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result));
    //         console.log("Favourites retrieval successful");
    //     }
    // })
});

module.exports = app;