const bcrypt = require('bcrypt');
const passport = require('passport');
const restaurantModel = require('../Models/Restaurant');
const customerModel = require('../Models/Customer');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    try {
        let existingUser;
        if(msg.isRestaurant) {
            existingUser = await restaurantModel.findOne({email: msg.email});
        }
        else {
            existingUser = await customerModel.findOne({email: msg.email});
        }

        if(existingUser) {
            // console.log('Error ', err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // console.log('User already exists');
            // res.end('User already exists');
            // return;

            // return done(null, false, {message: 'User already exists'});
            callback(null, '');
        }

        let saltRounds = 10;
        let hashedPassword = await bcrypt.hash(msg.password, saltRounds);
        
        let result;
        if(msg.isRestaurant) {
            result = new restaurantModel({
                email: msg.email,
                name: msg.name,
                password: hashedPassword,
                contactNumber: msg.contactno,
                startTime: msg.starttime,
                endTime: msg.endtime,
                description: msg.description
            });
        }
        else {
            result = new customerModel({
                email: msg.email,
                name: msg.name,
                password: hashedPassword,
                contactNumber: msg.contactno,
                dob: msg.dob,
                nickname: msg.nickname,
                about: msg.about
            });
        }

        result.address.push({
            street: msg.street,
            city: msg.city,
            state: msg.state,
            country: msg.country
        })

        result.save((err, data) => {
            if(err) {
                // done(err);
                callback(err);
            }
            else {
                // done(null, data);
                callback(null, data);
            }
        })
    }
    catch(err) {
        // console.log(err);
        // res.writeHead(400, {
        //     'Content-type': 'text/plain'
        // });
        // res.end("Error in query execution in finding restaurant/customer from DB ");
        // done(err);
        callback(err);
    }
};

exports.handle_request = handle_request;