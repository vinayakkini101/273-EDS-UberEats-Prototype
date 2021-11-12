const Restaurant = require('../Models/Restaurant.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);
    Restaurant.updateOne({
        email: msg.currentEmail,
        'address.street': msg.currentStreet
    }, {
        $set: {
            'address.$.street': msg.updatedStreet,
            'address.$.city': msg.city,
            'address.$.state': msg.state,
            'address.$.country': msg.country
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution in Restaurant address update ' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution in Restaurant address update");
            callback(err);
        }
        else {
            console.log("queryResult ", result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result[0]));
            console.log("Restaurant address updated successfully");
            callback(null, JSON.stringify(result[0]));
        }
    })
};

exports.handle_request = handle_request;