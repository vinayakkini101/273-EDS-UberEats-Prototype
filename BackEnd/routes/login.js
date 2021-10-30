const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const restaurantModel = require('../Models/Restaurant.js');
const customerModel = require('../Models/Customer.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const { auth } = require('../Utils/auth.js');

auth();

app.post('/login', async (req, res, next) => {
        console.log('in login backend before jwt.. req ', req.body);
        try {
            let user;
            if(req.body.isRestaurant) {
                user = await restaurantModel.findOne({email: req.body.email});
            }
            else {
                user = await customerModel.findOne({email: req.body.email});
            }
            console.log('user from db ', user);
            
            let isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if(isPasswordMatch) {
                // console.log('found password match in db ', user);
    
                // res.cookie('cookie', result.email, {
                //     maxAge: 360000,
                //     httpOnly: false,
                //     path: '/'
                // });
                // console.log("req.session.email " + req.session.email);
    
                // res.writeHead(200, {
                //     'Content-type': 'text/plain'
                // });
    
                // res.end(JSON.stringify(result));
                // console.log("Login successful");
                // return done(null, result, {message: 'Login successful'});
                const payload = { _id: user._id, user: user, isRestaurant: req.body.isRestaurant};
                const token = jwt.sign(payload, config.secret, {expiresIn: 1008000});
                res.status(200).end('Bearer '+ token);
            }
            else {
                console.log('Password does not match ');
                // res.writeHead(400, {
                //     'Content-type': 'text/plain'
                // });
                // console.log('Passwords do not match');
                // res.end('Passwords do not match');
                // return done(null, false, {message: 'Passwords do not match'});
                res.status(401).end('Invalid Credentials');
            }
        }
        catch(err) {
            console.log(err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution in finding restaurant from DB ");
            // return done(err);
            res.status(500).end('Error occured');
        }
        // console.log('req.body ', req.body);
    }
);

module.exports = app;