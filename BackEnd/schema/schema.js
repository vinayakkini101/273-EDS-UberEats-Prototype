const graphql = require('graphql');
const Restaurant = require('../Models/Restaurant');
const Order = require('../Models/Order.js');
const Customer = require('../Models/Customer.js');
const bcrypt = require('bcrypt');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        email: {type: GraphQLString},
        name: {type: GraphQLString},
        password: {type: GraphQLString},
        contactNumber: {type: GraphQLInt},
        dob: {type: GraphQLString},
        nickname: {type: GraphQLString},
        about: {type: GraphQLString},
        profilePicture: {type: GraphQLString},
        favourites: {type: new GraphQLList(FavouriteType)},
        address: {type: new GraphQLList(AddressType)}
    })
});

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        email: {type: GraphQLString},
        name: {type: GraphQLString},
        password: {type: GraphQLString},
        contactNumber: {type: GraphQLString},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        description: {type: GraphQLString},
        profilePicture: {type: GraphQLString},
        pickup: {type: GraphQLInt},
        delivery: {type: GraphQLInt},
        veg: {type: GraphQLInt},
        nonVeg: {type: GraphQLInt},
        vegan: {type: GraphQLInt},
        address: {type: new GraphQLList(AddressType)},
        dishes: {type: new GraphQLList(DishType)},
        isRestaurant: {
            type: GraphQLString,
            resolve() {
                return "true";
            }
        }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        userEmail: {type: GraphQLID},
        dateTime: {type: GraphQLString},
        address: {type: GraphQLString},
        status: {type: GraphQLString},
        userName: {type: GraphQLString},
        restaurantName: {type: GraphQLString},
        orderedDishes: {type: new GraphQLList(OrderedDishType)}
    })
});

const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        street: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        country: {type: GraphQLString}
    })
});

const FavouriteType = new GraphQLObjectType({
    name: 'Favourites',
    fields: () => ({
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        profilePicture: {type: GraphQLString}
    })
});

const DishType = new GraphQLObjectType({
    name: 'Dish',
    fields: () => ({
        dishCode: {type: GraphQLString},
        dishName: {type: GraphQLString},
        ingredients: {type: GraphQLString},
        description: {type: GraphQLString},
        category: {type: GraphQLString},
        price: {type: GraphQLString},
        imageLink: {type: GraphQLString},
        email: {type: GraphQLString}
    })
});

const OrderedDishType = new GraphQLObjectType({
    name: 'OrderedDish',
    fields: () => ({
        dishName: {type: GraphQLString},
        price: {type: GraphQLString},
        quantity: {type: GraphQLInt},
        dishImage: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        restaurant: {
            type: RestaurantType,
            args: {email: {type: GraphQLString}},
            async resolve(parent, args) {
                const prom = (email) => {
                    return new Promise((resolve, reject) => {
                        Restaurant.findOne({email}, (err, doc) => {
                            if (err) return reject(err);
                            else
                                return resolve(doc);
                        });
                    });
                }
                let results = await prom(args.email);
                results = JSON.parse(JSON.stringify(results));
                return results;
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            args: {userEmail: {type: GraphQLString}, restaurantName: {type: GraphQLString}},
            async resolve(parent, args) {
                const prom = (userEmail, restaurantName) => {
                    return new Promise((resolve, reject) => {
                        if(userEmail) {
                            Order.find({userEmail}, (err, doc) => {
                                if (err) return reject(err);
                                else
                                    return resolve(doc);
                            });
                        }
                        else {
                            // console.log('useremial and restnme ', userEmail, restaurantName);
                            Order.find({restaurantName}, (err, doc) => {
                                if (err) return reject(err);
                                else
                                    return resolve(doc);
                            });
                        }
                    });
                }
                let results = await prom(args.userEmail, args.restaurantName);
                // console.log('results ', results);
                results = JSON.parse(JSON.stringify(results));
                return results;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addNewDish: {
            type: DishType,
            args: {
                dishCode: {type: GraphQLString},
                dishName: {type: GraphQLString},
                ingredients: {type: GraphQLString},
                description: {type: GraphQLString},
                category: {type: GraphQLString},
                price: {type: GraphQLString},
                imageLink: {type: GraphQLString},
                email: {type: GraphQLString}
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise((resolve, reject) => {
                        console.log(' details ',  details);
                        Restaurant.updateOne({email: details.email}, 
                            {
                                $addToSet: {
                                    dishes: {
                                        dishCode: details.dishCode,
                                        dishName: details.dishName,
                                        ingredients: details.ingredients,
                                        description: details.description,
                                        category: details.category,
                                        price: details.price,
                                        imageLink: details.imageLink
                                    }
                                }
                            },
                            (err, doc) => {
                            if (err) return reject(err);
                            else
                                return resolve(doc);
                        });
                    });
                }
                let results = await prom(args);
                results = JSON.parse(JSON.stringify(results));
                return results;
            }
        },

        signupCustomer: {
            type: CustomerType,
            args: {
                email: {type: GraphQLString},
                name: {type: GraphQLString},
                password: {type: GraphQLString},
                contactNumber: {type: GraphQLString},
                dob: {type: GraphQLString},
                nickname: {type: GraphQLString},
                about: {type: GraphQLString},
                profilePicture: {type: GraphQLString}
                // address: {type: AddressType}
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise(async (resolve, reject) => {
                        console.log(' details ',  details);
                        try {
                            let existingUser;
                            if(details.isRestaurant) {
                                existingUser = await Restaurant.findOne({email: details.email});
                            }
                            else {
                                existingUser = await Customer.findOne({email: details.email});
                            }
                    
                            if(existingUser) {
                                resolve();
                            }
                    
                            let saltRounds = 10;
                            let hashedPassword = await bcrypt.hash(details.password, saltRounds);
                            
                            let result;
                            if(details.isRestaurant) {
                                result = new Restaurant({
                                    email: details.email,
                                    name: details.name,
                                    password: hashedPassword,
                                    contactNumber: details.contactNumber,
                                    startTime: details.starttime,
                                    endTime: details.endtime,
                                    description: details.description
                                });
                            }
                            else {
                                result = new Customer({
                                    email: details.email,
                                    name: details.name,
                                    password: hashedPassword,
                                    contactNumber: details.contactNumber,
                                    dob: details.dob,
                                    nickname: details.nickname,
                                    about: details.about
                                });
                            }
                    
                            // result.address.push({
                            //     street: details.street,
                            //     city: details.city,
                            //     state: details.state,
                            //     country: details.country
                            // })
                    
                            result.save((err, data) => {
                                if(err) {
                                    reject(err);
                                }
                                else {
                                    resolve(data);
                                }
                            })
                        }
                        catch(err) {
                            reject(err);
                        }
                    });
                }
                let results = await prom(args);
                results = JSON.stringify(results);
                return results;
            }
        },

        signupRestaurant: {
            type: RestaurantType,
            args: {
                email: {type: GraphQLString},
                name: {type: GraphQLString},
                password: {type: GraphQLString},
                contactNumber: {type: GraphQLString},
                startTime: {type: GraphQLString},
                endTime: {type: GraphQLString},
                description: {type: GraphQLString},
                profilePicture: {type: GraphQLString},
                isRestaurant: {type: GraphQLString}
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise(async (resolve, reject) => {
                        console.log(' details ',  details);
                        try {
                            let existingUser;
                            if(details.isRestaurant) {
                                existingUser = await Restaurant.findOne({email: details.email});
                            }
                            else {
                                existingUser = await Customer.findOne({email: details.email});
                            }
                    
                            if(existingUser) {
                                resolve();
                            }
                    
                            let saltRounds = 10;
                            let hashedPassword = await bcrypt.hash(details.password, saltRounds);
                            
                            let result;
                            if(details.isRestaurant) {
                                result = new Restaurant({
                                    email: details.email,
                                    name: details.name,
                                    password: hashedPassword,
                                    contactNumber: details.contactNumber,
                                    startTime: details.startTime,
                                    endTime: details.endTime,
                                    description: details.description
                                });
                            }
                            else {
                                result = new Customer({
                                    email: details.email,
                                    name: details.name,
                                    password: hashedPassword,
                                    contactNumber: details.contactNumber,
                                    dob: details.dob,
                                    nickname: details.nickname,
                                    about: details.about
                                });
                            }
                    
                            // result.address.push({
                            //     street: details.street,
                            //     city: details.city,
                            //     state: details.state,
                            //     country: details.country
                            // })
                    
                            result.save((err, data) => {
                                if(err) {
                                    reject(err);
                                }
                                else {
                                    resolve(data);
                                }
                            })
                        }
                        catch(err) {
                            reject(err);
                        }
                    });
                }
                let results = await prom(args);
                results = JSON.stringify(results);
                return results;
            }
        }

    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;