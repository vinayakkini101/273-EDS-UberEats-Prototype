const Customer = require('../Models/Customer.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    Customer.updateOne({
        email: msg.favourite.userEmail
    }, {
        $addToSet: {
            favourites: {
                name: msg.favourite.restaurantName,
                email: msg.favourite.restaurantEmail,
                city: msg.favourite.restaurantCity,
                state: msg.favourite.restaurantState,
                profilePicture: msg.favourite.restaurantPicture
            }
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution (adding favourite)' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in adding favourite");
            callback(err);
        }
        else {
            console.log('result ', result);
            // res
            //     .writeHead(200, {
            //         'Content-Type': 'text/plain'
            //     })
            //     .end();
            callback(null, result);
        }
    })
};

exports.handle_request = handle_request;