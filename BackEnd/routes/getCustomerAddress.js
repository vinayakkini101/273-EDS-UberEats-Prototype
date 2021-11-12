const express = require('express');
const app = express.Router();
const Customer = require('../Models/Customer.js');
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/getCustomerAddresses', checkAuth, (req, res) => {
    console.log('req.body ', req.body);

    kafka.make_request('get_customer_addresses', req.body, function (err, results) {
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
    //     email: req.body.customerEmail
    // },
    // 'address',
    // (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution (fetching from Customer)");
    //     }
    //     else {
    //         console.log('result ',result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result));
    //         console.log("Customer address details fetched successfully");
    //     }
    // });
});

module.exports = app;