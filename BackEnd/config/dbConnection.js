var mysql = require('promise-mysql');
const constants = require('./config.json');

var connection = mysql.createConnection({
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database,
    dateStrings: [
        'DATE',
        'DATETIME'
    ]
});

module.exports = connection;