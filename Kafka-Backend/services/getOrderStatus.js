const Order = require('../Models/Order.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    Order.findOne({
        userEmail: msg.userEmail,
        dateTime: msg.orderDateTime
    },
    'status',
    (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the order status)' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution (getting the order status)");
            callback(err);
        }
        else {
            console.log('order status result ', result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result));
            console.log("status retrieved successfully");
            callback(null, JSON.stringify(result));
        }
    })
};

exports.handle_request = handle_request;