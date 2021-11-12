const Order = require('../Models/Order.js');

async function handle_request(msg, callback) {
    console.log("Inside login kafka backend");
    console.log(msg);

    const orderedDishes = [];
    for(let item of msg.cartItems) {
        orderedDishes.push({
            dishName: item.dishName,
            price: item.price,
            quantity: item.quantity,
            dishImage: item.dishImage
        });
    }

    const newOrder = new Order({
        userEmail: msg.userEmail,
        dateTime: msg.orderDateTime,
        address: msg.combinedSelectedAddress,
        status: 'New',
        userName: msg.userName,
        restaurantName: msg.cartItems[0].restaurantName,
        orderedDishes: orderedDishes
    })

    newOrder.save((err, result) => {
        if(err) {
            console.log('Error in query execution (saving order)' + err);
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end('Error in query execution (saving order)');
            callback(err);
        }
        else {
            console.log("result ", result);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });

            // res.end();
            console.log('order added successfully');
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;