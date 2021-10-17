const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://admin:admin%40123@cluster0.mp3pk.mongodb.net/Cluster0?retryWrites=true&w=majority';

let options = {
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