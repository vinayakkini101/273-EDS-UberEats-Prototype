const express = require('express');
const app = express.Router();
const Customer = require('../Models/Customer.js');

app.post('/addCustomerAddress', (req, res) => {
    console.log('req.body ', req.body);

    Customer.updateOne({
        email: req.body.customerEmail
    }, {
        $addToSet: {
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country
            }
        }
    }, (err, result) => {
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
    })
});

module.exports = app;