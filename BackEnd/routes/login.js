const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const restaurantModel = require('../Models/Restaurant.js');
const customerModel = require('../Models/Customer.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const { auth } = require('../Utils/auth.js');
var kafka = require("../kafka/client");

auth();

app.post('/login', async (req, res, next) => {

    kafka.make_request('login', req.body, function (err, results) {
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
    //     console.log('in login backend before jwt.. req ', req.body);
    //     try {
    //         let user;
    //         if(req.body.isRestaurant) {
    //             user = await restaurantModel.findOne({email: req.body.email});
    //         }
    //         else {
    //             user = await customerModel.findOne({email: req.body.email});
    //         }
    //         console.log('user from db ', user);
            
    //         let isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    //         if(isPasswordMatch) {
    //             const payload = { _id: user._id, user: user, isRestaurant: req.body.isRestaurant};
    //             const token = jwt.sign(payload, config.secret, {expiresIn: 1008000});
    //             res.status(200).end('Bearer '+ token);
    //         }
    //         else {
    //             console.log('Password does not match ');
    //             res.status(401).end('Invalid Credentials');
    //         }
    //     }
    //     catch(err) {
    //         console.log(err);
    //         res.status(500).end('Error occured');
    //     }
    }
);

module.exports = app;