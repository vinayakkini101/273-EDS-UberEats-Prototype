const Order = require('../Models/Order.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    Order.updateOne({
        userEmail: msg.userEmail,
        dateTime: msg.orderDateTime
    }, {
        status: msg.newStatus
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution (update order status)' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution (update order status)");
            callback(err);
        }
        else {
            console.log("result ", result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result));
            console.log("Order status updated successfully");
            callback(null, JSON.stringify(result));
        }
    })
};

exports.handle_request = handle_request;