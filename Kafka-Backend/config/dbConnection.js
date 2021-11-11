const config = require('./config.json');

const mongoose = require('mongoose');
const connectionString = config.DB.host;

let options = {
    minPoolSize: 5,
    maxPoolSize: 20,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500
}

mongoose.connect(connectionString, options, (err, res) => {
    if(err)
        console.log(err);
    else
        console.log('connected to mongodb');
})