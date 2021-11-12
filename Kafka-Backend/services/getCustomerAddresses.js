const Customer = require('../Models/Customer.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

      Customer.findOne({
            email: msg.customerEmail
        },
        'address',
        (err, result) => {
            if(err) {
                console.log('Error in query execution ' + err);
                // res.writeHead(400, {
                //     'Content-type': 'text/plain'
                // });
                // res.end("Error in query execution (fetching from Customer)");
                callback(err);
            }
            else {
                console.log('result ',result);
                // res.writeHead(200, {
                //     'Content-type': 'text/plain'
                // });
    
                // res.end(JSON.stringify(result));
                console.log("Customer address details fetched successfully");
                callback(null, JSON.stringify(result));
            }
        });
}

exports.handle_request = handle_request;