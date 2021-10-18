const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    description: {type: String},
    profilePicture: {type: String},
    pickup: {type: Number},
    delivery: {type: Number},
    veg: {type: Number},
    nonVeg: {type: Number},
    vegan: {type: Number},
    address: {type: Array}
},
{
    versionKey: false
})

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantModel;