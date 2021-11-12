const Restaurant = require('../Models/Restaurant.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    Restaurant.findOne({
        email: msg.restaurantEmail
    }, (err, result) => {
        if(err) {
            console.log('Error in getting restaurant profile ' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in getting restaurant profile");
            callback(err);
        }
        else {
            console.log('result ', result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result));
            console.log("Restaurant details fetched successfully");
            callback(null, JSON.stringify(result));
        }
    })
};

exports.handle_request = handle_request;