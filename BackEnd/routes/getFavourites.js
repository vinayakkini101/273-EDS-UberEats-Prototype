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

    // pool
    //     .catch((err) => {
    //         console.log('Error in creating pool ' + err);
    //         res.writeHead(500, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error while creating pool");
    //     })
    //     .then((conn) => {
    //         console.log('Pool created');
    //         dbConn = conn;
    //         console.log('user email id from body ', req.body.userEmail);
    //         // let restaurantID = result[0].Restaurant_ID;
    //         let queryResult;
    //         queryResult = dbConn.query(`SELECT * from Favourites WHERE userEmail=${mysql.escape(req.body.userEmail)}`);
            
    //         return queryResult;
    //     })
    //     .catch((err) => {
    //         console.log('Error in query execution (getting the favourites)' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution");
    //     })
    //     .then((queryResult) => {
    //         console.log('favourites list ', queryResult);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end(JSON.stringify(queryResult));
    //         console.log("Favourites retrieval successful");
    //     })
});

module.exports = app;