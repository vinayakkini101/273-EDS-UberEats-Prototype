const mongoose = require('mongoose');

let customerSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    dob: {type: Date, required: true},
    nickname: {type: String, required: true},
    about: {type: String},
    profilePicture: {type: String},
    favourites: {type: Array}
},
{
    versionKey: false
});

const customerModel = mongoose.model('customer', customerSchema);
module.exports = customerModel;