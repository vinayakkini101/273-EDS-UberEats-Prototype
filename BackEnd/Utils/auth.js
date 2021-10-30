const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const restaurantModel = require('../Models/Restaurant.js');
const customerModel = require('../Models/Customer.js');
const bcrypt = require('bcrypt');
const config = require('../config/config.json');

/*
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                let existingUser;
                if(req.body.isRestaurant) {
                    existingUser = await restaurantModel.findOne({email: req.body.email});
                }
                else {
                    existingUser = await customerModel.findOne({email: req.body.email});
                }
        
                if(existingUser) {
                    // console.log('Error ', err);
                    // res.writeHead(400, {
                    //     'Content-type': 'text/plain'
                    // });
                    // console.log('User already exists');
                    // res.end('User already exists');
                    // return;
                    return done(null, false, {message: 'User already exists'});
                }
        
                let saltRounds = 10;
                let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
                
                let result;
                if(req.body.isRestaurant) {
                    result = new restaurantModel({
                        email: req.body.email,
                        name: req.body.name,
                        password: hashedPassword,
                        contactNumber: req.body.contactno,
                        startTime: req.body.starttime,
                        endTime: req.body.endtime,
                        description: req.body.description
                    });
                }
                else {
                    result = new customerModel({
                        email: req.body.email,
                        name: req.body.name,
                        password: hashedPassword,
                        contactNumber: req.body.contactno,
                        dob: req.body.dob,
                        nickname: req.body.nickname,
                        about: req.body.about
                    });
                }
        
                result.address.push({
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country
                })
        
                result.save((err, data) => {
                    if(err) {
                        return done(err);
                    }
                    else {
                        return done(null, data);
                    }
                })
            }
            catch(err) {
                // console.log(err);
                // res.writeHead(400, {
                //     'Content-type': 'text/plain'
                // });
                // res.end("Error in query execution in finding restaurant/customer from DB ");
                return done(err);
            }
        }
    )
);


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            console.log('in passport login def ');
            try {
                let result;
                if(req.body.isRestaurant) {
                    result = await restaurantModel.findOne({email: email});
                }
                else {
                    result = await customerModel.findOne({email: email});
                }
        
                let isPasswordMatch = await bcrypt.compare(password, password);
                if(isPasswordMatch) {
                    console.log('found password match in db ', result);
        
                    // res.cookie('cookie', result.email, {
                    //     maxAge: 360000,
                    //     httpOnly: false,
                    //     path: '/'
                    // });
                    // console.log("req.session.email " + req.session.email);
        
                    // res.writeHead(200, {
                    //     'Content-type': 'text/plain'
                    // });
        
                    // res.end(JSON.stringify(result));
                    // console.log("Login successful");
                    return done(null, result, {message: 'Login successful'});
                }
                else {
                    console.log('Password does not match ');
                    // res.writeHead(400, {
                    //     'Content-type': 'text/plain'
                    // });
                    // console.log('Passwords do not match');
                    // res.end('Passwords do not match');
                    return done(null, false, {message: 'Passwords do not match'});
                }
            }
            catch(err) {
                console.log(err);
                // res.writeHead(400, {
                //     'Content-type': 'text/plain'
                // });
                // res.end("Error in query execution in finding restaurant from DB ");
                return done(err);
            }
        }
    )
)
*/

function auth() {
    // console.log('in auth()');
    var options = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer')
    }
    passport.use(
        new JWTstrategy(options, (jwtPayload, done) => {
            console.log('in jwt auth() ');
            const userID = jwtPayload._id;
            const isRestaurant = jwtPayload.isRestaurant;
            // console.log('typeof isresto in jwt auth() ', typeof isRestaurant);
            if(isRestaurant) {
                restaurantModel.findById(userID, (err, results) => {
                    if(err) {
                        return done(err, false);
                    }
                    if(results) {
                        return done(null, results);
                    }
                    else {
                        return done(null, false);
                    }
                })
            }
            else {
                customerModel.findById(userID, (err, results) => {
                    if(err) {
                        return done(err, false);
                    }
                    if(results) {
                        return done(null, results);
                    }
                    else {
                        return done(null, false);
                    }
                })
            }
            
            // try{
            //     console.log('in jwt ', token);
            //     return done(null, token.user);
            // }
            // catch(err) {
            //     return done(err);
            // }
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', {session: false});