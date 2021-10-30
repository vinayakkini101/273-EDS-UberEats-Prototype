const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');
const { checkAuth } = require('../Utils/auth.js');

app.post('/updateRestaurantAddress', checkAuth, (req, res) => {
    console.log(req.body);

    Restaurant.updateOne({
        email: req.body.currentEmail,
        'address.street': req.body.currentStreet
    }, {
        $set: {
            'address.$.street': req.body.updatedStreet,
            'address.$.city': req.body.city,
            'address.$.state': req.body.state,
            'address.$.country': req.body.country
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in query execution in Restaurant address update ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution in Restaurant address update");
        }
        else {
            console.log("queryResult ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result[0]));
            console.log("Restaurant address updated successfully");
        }
    })
});

module.exports = app;