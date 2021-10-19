const express = require('express');
const app = express.Router();
const Customer = require('../Models/Customer.js');

app.post('/getCustomerProfile', (req, res) => {
    console.log('req.body ', req.body);

    Customer.findOne({
        email: req.body.customerEmail
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution (fetching customer profile) ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (fetching customer profile)");
        }
        else {
            console.log('result ', result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log('Customer details fetched successfully');
        }
    })
});

module.exports = app;