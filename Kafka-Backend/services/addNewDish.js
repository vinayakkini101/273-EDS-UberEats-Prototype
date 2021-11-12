// const { upload } = require('./uploadDownload.js');
const Restaurant = require('../Models/Restaurant.js');
const mongoose = require('mongoose');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    let dishCode = new mongoose.Types.ObjectId().toString() + new Date().toISOString();
    console.log('new dishCode ', dishCode);
    Restaurant.updateOne({
        email: msg.restaurantEmail
    }, {
        $addToSet: {
            dishes: {
                dishCode: dishCode,
                dishName: msg.dishname,
                ingredients: msg.ingredients,
                description: msg.description,
                category: msg.category,
                price: msg.price,
                imageLink: msg.imageLink
            }
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in adding dish ' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in adding dish");
            callback(err);
        }
        else {
            console.log("result ", result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(dishCode));
            callback(null, JSON.stringify(dishCode));
            console.log("Dish added successfully");
        }
    });

};

exports.handle_request = handle_request;