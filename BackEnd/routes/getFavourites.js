const express = require('express');
const app = express.Router();
const Customer = require('../Models/Customer.js');

app.post('/getFavourites', (req, res) => {
    console.log('getFavourites req.body ',req.body);

    Customer.findOne({
        email: req.body.userEmail
    }, 
    'favourites',
    (err, result) => {
        if(err) {
            console.log('Error in query execution (getting the favourites)' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in query execution");
        }
        else {
            console.log('favourites list result', result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end(JSON.stringify(result));
            console.log("Favourites retrieval successful");
        }
    })
});

module.exports = app;