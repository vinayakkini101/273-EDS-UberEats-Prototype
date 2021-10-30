const express = require('express');
const app = express.Router();
const Customer = require('../Models/Customer.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/getCustomerAddresses', checkAuth, (req, res) => {
    console.log('req.body ', req.body);

    Customer.findOne({
        email: req.body.customerEmail
    },
    'address',
    (err, result) => {
        if(err) {
            console.log('Error in query execution ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution (fetching from Customer)");
        }
        else {
            console.log('result ',result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Customer address details fetched successfully");
        }
    });
});

module.exports = app;