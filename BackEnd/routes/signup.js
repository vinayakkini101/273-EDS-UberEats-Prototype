const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const restaurantModel = require('../Models/Restaurant');
const customerModel = require('../Models/Customer');

app.post('/signup', async (req, res) => {
    console.log('req.body ', req.body);

    try {
        let existingUser;
        if(req.body.isRestaurant) {
            existingUser = await restaurantModel.findOne({email: req.body.email});
        }
        else {
            existingUser = await customerModel.findOne({email: req.body.email});
        }

        if(existingUser) {
            console.log('Error ', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            console.log('User already exists');
            res.end('User already exists');
            return;
        }

        let saltRounds = 10;
        let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        
        let result;
        if(req.body.isRestaurant) {
            result = new restaurantModel({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                contactNumber: req.body.contactno,
                startTime: req.body.starttime,
                endTime: req.body.endtime,
                description: req.body.description
            });
        }
        else {
            result = new customerModel({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                contactNumber: req.body.contactno,
                dob: req.body.dob,
                nickname: req.body.nickname,
                about: req.body.about
            });
        }

        result.address.push({
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        })

        result.save((err, data) => {
            if(err) {
                console.log(err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end("Error in saving restaurant/customer to DB ");
            }
            else {
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
    
                console.log("Signup successful");
                res.end('Signup successful');
            }
        })
    }
    catch(err) {
        console.log(err);
        res.writeHead(400, {
            'Content-type': 'text/plain'
        });
        res.end("Error in query execution in finding restaurant/customer from DB ");
    }
});

module.exports = app;