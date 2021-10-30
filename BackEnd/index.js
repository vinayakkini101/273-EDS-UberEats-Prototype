var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var LocalStorage = require('node-localstorage').LocalStorage;
var passport = require('passport');

localStorage = new LocalStorage('./local');
var pool = require('./config/dbConnection.js');
const constants = require('./config/config.json');
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const getAllDishes = require('./routes/getAllDishes.js');
const addNewDish = require('./routes/addNewDish.js');
const deleteDish = require('./routes/deleteDish.js');
const getRestaurantProfile = require('./routes/getRestaurantProfile.js');
const updateRestaurantProfile = require('./routes/updateRestaurantProfile.js');
const updateRestaurantAddress = require('./routes/updateRestaurantAddress.js');
const getAllRestaurants = require('./routes/getAllRestaurants.js');
const { uploadDownload } = require('./routes/uploadDownload.js');
const getCustomerProfile = require('./routes/getCustomerProfile.js');
const updateCustomerProfile = require('./routes/updateCustomerProfile.js');
const updateCustomerAddress = require('./routes/updateCustomerAddress.js');
const addToCart = require('./routes/addToCart.js');
const getCartItems = require('./routes/getCartItems.js')
const getCustomerAddresses = require('./routes/getCustomerAddress.js');
const addCustomerAddress = require('./routes/addCustomerAddress.js');
const addOrder = require('./routes/addOrder.js');
const getOrders = require('./routes/getOrders.js');
const getOrderedDishes = require('./routes/getOrderedDishes.js');
const updateOrderStatus = require('./routes/updateOrderStatus.js');
const getOrderStatus = require('./routes/getOrderStatus.js');
const addFavourite = require('./routes/addFavourite.js');
const getFavourites = require('./routes/getFavourites.js');
const { auth } = require('./Utils/auth.js');
const logout = require('./routes/logout.js');


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});

app.use(cors({ origin: true, credentials: true}));

// app.use(session({
//     secret: 'UberEatsClone',
//     resave: false,
//     saveUninitialized: false,
//     duration: 60 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000
// }));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', constants.frontEnd);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Methods', 'GET,HEAD,POST,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Accept');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', login);
app.use('/', signup);
app.use('/', getAllDishes);
app.use('/', addNewDish);
app.use('/', deleteDish);
app.use('/', getRestaurantProfile);
app.use('/', updateRestaurantProfile);
app.use('/', uploadDownload);
app.use('/', getCustomerProfile);
app.use('/', updateCustomerProfile);
app.use('/', updateCustomerAddress);
app.use('/', getAllRestaurants);
app.use('/', addToCart);
app.use('/', getCartItems);
app.use('/', getCustomerAddresses);
app.use('/', addCustomerAddress);
app.use('/', addOrder);
app.use('/', getOrders);
app.use('/', getOrderedDishes);
app.use('/', updateOrderStatus);
app.use('/', getOrderStatus);
app.use('/', addFavourite);
app.use('/', getFavourites);
app.use('/', updateRestaurantAddress);
app.use('/', logout);

// const Restaurants = require('./Models/Restaurant.js');
// const restaurant = new Restaurants({
//     'email': 'paradise.sanfrancisco@paradise.com',
//     'name': 'Paradise',
//     'password': '$2b$10$a9o8dhyOj5KejKKW0plm7.fmYkdD.TNcJkgaRSUQYLbEsXjd05TV.',
//     'contactNumber': '8772341322',
//     'startTime': '11:00',
//     'endTime': '23:30',
//     'description': `Paradise Restaurant`,
//     'profilePicture': '/items/download-image/paradise.webp',
//     'pickup': '1',
//     'delivery': '1',
//     'veg': '1',
//     'nonVeg': '1',
//     'vegan': '0'
// });
// restaurant.save((err, res) => {
//     if(err)
//         console.log(err);
//     else
//         console.log(res);
// });

// const Customers = require('./Models/Customer.js');
// const customer = new Customers({
//     'email': 'johnsmith@gmail.com',
//     'name': 'John Smith',
//     'password': '$2b$10$swk0CS4us4Lj1oGrQZI.S.29RYdNUHL6wQghPaw5q5BUtsiOk2nxK',
//     'contactNumber': '8872384387',
//     'dob': '2/17/1987',
//     'nickname': 'john',
//     'about': 'Bibliophile and Foodie!',
//     'profilePicture': '/items/download-image/john-smith-profile.jpeg',
//     'favourites': []
// });
// customer.save((err, res) => {
//     if(err)
//         console.log(err);
//     else
//         console.log(res);
// });

app.get('/test-api', function(req, res) {

    pool
        .then((conn) => {
            console.log("pool created");
            return conn;
        })
        .catch((err) => {
            console.log('Error occured in creating pool ' + err);
        })
        .then((conn) => {
            let result = conn.query('SELECT * FROM Restaurant');
            return result;
        })
        .catch((err) => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(err.code);
        })
        .then((result) => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        })

        // pool.getConnection((err) => {
    //     if(err) {
    //         throw 'Error occured: ' + err;
    //     }
    //     console.log("pool created");
    // })

    // pool.query('SELECT * FROM Restaurant', function (error, results) {
    //     if (error) {
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         });
    //         res.end(error.code);
    //     }
    //     else {
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         });
    //         res.end(JSON.stringify(results));
    //     }
    // });
});



