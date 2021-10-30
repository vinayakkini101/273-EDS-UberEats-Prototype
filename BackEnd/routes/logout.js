const express = require('express');
const { checkAuth } = require('../Utils/auth');
const app = express.Router();

app.post('/logout', checkAuth, (req, res) => {
    // console.log('req in logout ', req);
    req.logOut();
    res.writeHead(200, {
        'Content-type': 'text/plain'
    });
    // res.redirect('/');
    res.end();
    console.log('logged out');
})

module.exports = app;