const Restaurant = require('../Models/Restaurant.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    Restaurant.updateOne({
        email: msg.currentEmail
    }, {
        name: msg.name,
        email: msg.email,
        description: msg.description,
        contactNumber: msg.contactno,
        startTime: msg.starttime,
        endTime: msg.endtime,
        profilePicture: msg.imageName,
        pickup: msg.pickup,
        delivery: msg.delivery,
        veg: msg.veg,
        nonVeg: msg.nonveg,
        vegan: msg.vegan
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution in restaurant details update ' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution in restaurant details update ");
            callback(err);
        }
        else {
            console.log("result ", result);
            // res.writeHead(200ult, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(res));
            console.log("Restaurant details updated successfully");
            callback(null, JSON.stringify(result));
        }
    })
};

exports.handle_request = handle_request;