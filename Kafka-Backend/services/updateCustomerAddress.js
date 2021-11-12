const Customer = require('../Models/Customer.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    Customer.updateOne({
        email: msg.currentEmail,
        'address.street': msg.currentStreet
    }, {
        $set: {
            'address.$.street': msg.street,
            'address.$.city': msg.city,
            'address.$.state': msg.state,
            'address.$.country': msg.country
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution in Customer address update ' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution in Customer address update");
            callback(err);
        }
        else {
            console.log("queryResult ", result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result[0]));
            console.log("Customer address updated successfully");
            callback(null, JSON.stringify(result[0]));
        }
    })
};


exports.handle_request = handle_request;