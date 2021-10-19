const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
    userEmail: {type: String, required: true},
    dateTime: {type: String, required: true},
    address: {type: String, required: true},
    status: {type: String, required: true},
    userName: {type: String, required: true},
    restaurantName: {type: String, required: true},
    orderedDishes: {type: Array, required: true}
},
{
    versionKey: false
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;