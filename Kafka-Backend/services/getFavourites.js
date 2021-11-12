const Customer = require('../Models/Customer.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    Customer.findOne({
        email: msg.userEmail
    }, 
    'favourites',
    (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the favourites)' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution");
            callback(err);
        }
        else {
            console.log('favourites list result', result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result));
            // console.log("Favourites retrieval successful");
            callback(null, JSON.stringify(result));
        }
    })
};

exports.handle_request = handle_request;
