const Customer = require('../Models/Customer.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);
    Customer.updateOne({
        email: msg.currentEmail
    }, {
        name: msg.name,
        email: msg.email,
        about: msg.about,
        contactNumber: msg.contactno,
        nickname: msg.nickname,
        dob: msg.dob,
        profilePicture: msg.imageName
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution in customer details update ' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("Error in query execution in customer details update ");
            callback(err);
        }
        else {
            console.log("result ", result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end(JSON.stringify(result));
            console.log("customer details updated successfully");
            callback(null, JSON.stringify(result));
        }
    })
};

exports.handle_request = handle_request;