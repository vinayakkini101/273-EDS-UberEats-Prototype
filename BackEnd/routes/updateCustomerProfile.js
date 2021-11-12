const express = require('express');
const app = express.Router();
const { checkAuth } = require('../Utils/auth.js');
const kafka = require("../kafka/client");

app.post('/updateCustomerProfile', checkAuth, (req, res) => {
    console.log(req.body);

    kafka.make_request('update_customer_profile', req.body, function (err, results) {
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
    //     email: req.body.currentEmail
    // }, {
    //     name: req.body.name,
    //     email: req.body.email,
    //     about: req.body.about,
    //     contactNumber: req.body.contactno,
    //     nickname: req.body.nickname,
    //     dob: req.body.dob,
    //     profilePicture: req.body.imageName
    // }, (err, result) => {
    //     if(err) {
    //         console.log('Error in query execution in customer details update ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution in customer details update ");
    //     }
    //     else {
    //         console.log("result ", result);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(result));
    //         console.log("customer details updated successfully");
    //     }
    // })
});

module.exports = app;