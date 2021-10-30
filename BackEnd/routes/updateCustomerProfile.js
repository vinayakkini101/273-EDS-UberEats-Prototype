const express = require('express');
const app = express.Router();
const Customer = require('../Models/Customer.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/updateCustomerProfile', checkAuth, (req, res) => {
    console.log(req.body);

    Customer.updateOne({
        email: req.body.currentEmail
    }, {
        name: req.body.name,
        email: req.body.email,
        about: req.body.about,
        contactNumber: req.body.contactno,
        nickname: req.body.nickname,
        dob: req.body.dob,
        profilePicture: req.body.imageName
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution in customer details update ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution in customer details update ");
        }
        else {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("customer details updated successfully");
        }
    })
});

module.exports = app;