const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const restaurantModel = require('../Models/Restaurant.js');
const customerModel = require('../Models/Customer.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
// const { auth } = require('../Utils/auth.js');

// auth();

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    console.log('in login backend before jwt.. msg ', msg);
    try {
        let user;
        if(msg.isRestaurant) {
            user = await restaurantModel.findOne({email: msg.email});
        }
        else {
            user = await customerModel.findOne({email: msg.email});
        }
        console.log('user from db ', user);
        
        let isPasswordMatch = await bcrypt.compare(msg.password, user.password);
        if(isPasswordMatch) {
            const payload = { _id: user._id, user: user, isRestaurant: msg.isRestaurant};
            const token = jwt.sign(payload, config.secret, {expiresIn: 1008000});
            // res.status(200).end('Bearer '+ token);
            callback(null, 'Bearer '+ token);
        }
        else {
            console.log('Password does not match ');
            // res.status(401).end('Invalid Credentials');
            callback(null, 'Invalid Credentials');
        }
    }
    catch(err) {
        console.log(err);
        // res.status(500).end('Error occured');
        callback(err);
    }
}

// app.post('/login', async (req, res, next) => {
        
    // }
// );

exports.handle_request = handle_request;