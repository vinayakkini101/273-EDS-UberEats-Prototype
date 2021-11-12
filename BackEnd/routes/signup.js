const express = require('express');
const app = express.Router();
const kafka = require("../kafka/client");

app.post('/signup', async (req, res) => {

    kafka.make_request('signup', req.body, function (err, results) {
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {
          console.log("Inside router post");
          console.log(results);
          res.status(200).send(results);
        }
    });

    
});

module.exports = app;