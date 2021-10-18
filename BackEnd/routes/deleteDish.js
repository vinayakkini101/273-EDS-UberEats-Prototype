const express = require('express');
const app = express.Router();
const Restaurant = require('../Models/Restaurant.js');

app.post('/deleteDish', (req, res) => {
    console.log('delete dish req.body ', req.body);

    Restaurant.updateOne({
        email: req.body.restaurantEmail,
    }, {
        $pull: {
            dishes: {dishCode: req.body.dishCode[0]}
        }
    }, (err, result) => {
        if(err) {
            console.log('Error in dish deletion ' + err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end("Error in dish deletion");
        }
        else {
            console.log("result ", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });

            res.end();
            console.log("Dish deleted successfully");
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
    //         let queryResult;
    //         queryResult = conn.query(`DELETE FROM Dish 
    //                                     WHERE Restaurant_Email=${mysql.escape(req.body.restaurantEmail)} 
    //                                     AND
    //                                     Dish_Code=${mysql.escape(req.body.dishcode)}`);

    //         return queryResult;
    //     })
    //     .catch((err) => {
    //         console.log('Error in query execution ' + err);
    //         res.writeHead(400, {
    //             'Content-type': 'text/plain'
    //         });
    //         res.end("Error in query execution");
    //     })
    //     .then((queryResult) => {
    //         console.log("queryResult ", queryResult);
    //         res.writeHead(200, {
    //             'Content-type': 'text/plain'
    //         });

    //         res.end();
    //         console.log("Dish deleted successfully");
    //     })
});

module.exports = app;