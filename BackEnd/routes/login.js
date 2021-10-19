const express = require('express');
// const mysql = require('mysql');
const app = express.Router();
const bcrypt = require('bcrypt');
// const pool = require('../config/dbConnection.js');
const restaurantModel = require('../Models/Restaurant.js');
const customerModel = require('../Models/Customer.js');

app.post('/login', async (req, res) => {
    console.log('req.body ', req.body);

    try {
        let result;
        if(req.body.isRestaurant) {
            result = await restaurantModel.findOne({email: req.body.email});
        }
        else {
            result = await customerModel.findOne({email: req.body.email});
        }

        let isPasswordMatch = await bcrypt.compare(req.body.password, result.password);
        if(isPasswordMatch) {
            console.log(result);

            res.cookie('cookie', result.email, {
                maxAge: 360000,
                httpOnly: false,
                path: '/'
            });
            console.log("req.session.email " + req.session.email);

            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Login successful");
        }
        else {
            console.log('Error ', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            console.log('Passwords do not match');
            res.end('Passwords do not match');
        }
    }
    catch(err) {
        console.log(err);
        res.writeHead(400, {
            'Content-type': 'text/plain'
        });
        res.end("Error in query execution in finding restaurant from DB ");
    }
});

module.exports = app;