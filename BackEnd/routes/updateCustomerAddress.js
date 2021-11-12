const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/updateCustomerAddress', checkAuth, (req, res) => {
    console.log('req.body ', req.body);

    kafka.make_request('update_customer_address', req.body, function (err, results) {
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
    //     email: req.body.currentEmail,
    //     'address.street': req.body.currentStreet
    // }, {
    //     $set: {
    //         'address.$.street': req.body.street,
    //         'address.$.city': req.body.city,
    //         'address.$.state': req.body.state,
    //         'address.$.country': req.body.country
    //     }
    // }, (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution in Customer address update ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution in Customer address update");
    //     }
    //     else {
    //         console.log("queryResult ", result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result[0]));
    //         console.log("Customer address updated successfully");
    //     }
    // })
});

module.exports = app;