import axios from 'axios';
import { actionCreater } from '../actions/index.js';
import gqlConfig from '../../graphql/config.js';
import { getAllDishesQuery, getRestaurantQuery, getOrderQuery } from '../../graphql/queries.js';

import { ADD_DISH, DELETE_DISH, GET_ALL_DISHES, GET_RESTAURANT_PROFILE } from '../constants/action-types';
import { GET_ORDERS } from '../constants/action-types';
import { addNewDish } from '../../graphql/mutations.js';

function getAllDishesAsync(payload) {
    return (dispatch, getState) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        // axios.get('/getAllDishes', {
        //                 params: {
        //                     restaurantEmail: payload
        //                 }
        //     })
        gqlConfig({
            query: getAllDishesQuery,
            variables: {'email': payload}
        })
            .then((response) => {
                // if (response.status === 200) {
                    console.log("response handleGetAllDishes ", response.data);
                    let dishList = [];
                    for(let dish of response.data.restaurant.dishes) {
                        // if(dish.length > 0) {
                            dish.restaurantEmail = response.data.restaurant.email;
                            dishList.push(dish);
                        // }
                    }
                    dispatch(actionCreater(GET_ALL_DISHES, dishList));
                // }
            })
            .catch(error => {
                console.log("Get all dishes error");
                // this.setState({
                //     isPageUpdated: "false"
                // });
                console.log(error);
                alert("Unable to get dishes, please try again!");
                dispatch(actionCreater(GET_ALL_DISHES, {}))
            })
    }
}

function addDishAsync(payload) {
    return dispatch => {
        console.log('dispatching addDish action');
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        // axios.post('/addNewDish', {
        //         ...payload, 
        //         restaurantEmail: localStorage.getItem('userEmail'),
        //     })
        gqlConfig({
            query: addNewDish,
            variables: {
                ...payload,
                email: localStorage.getItem('userEmail'),
                dishCode: payload.dishcode,
                dishName: payload.dishname
            }
        })
            .then((response) => {
                // if (response.status === 200) {
                    console.log("response in addNewDish ", response.data);
                    payload.dishCode = response.data;
                    dispatch(actionCreater(ADD_DISH, payload));
                // }
            })
            .catch(error => {
                console.log("Add new dish error");
                console.log(error);
                alert("Unable to add new dish, please try again!");
                dispatch(actionCreater(ADD_DISH, {}));
            })
    }
}

function deleteDishAsync({dishCode, restaurantEmail}) {
    return dispatch => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('/deleteDish', {
            dishCode,
            restaurantEmail
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    dispatch(actionCreater(DELETE_DISH, {dishCode: response.data}));
                }
            })
            .catch(error => {
                console.log("Delete dish error");
                console.log(error);
                alert("Unable to delete dish, please try again!");
                dispatch(actionCreater(DELETE_DISH));
            })
    }
}

function getRestaurantProfileAsync(payload) {
    return dispatch => {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        // axios.post('/getRestaurantProfile', {
        //     restaurantEmail: payload
        // })
        gqlConfig({
            query: getRestaurantQuery,
            variables: {'email': payload}
        })
        .then((response) => {
            // if (response.status === 200) {
                console.log("response ", response.data);
                const details = response.data.restaurant;
                dispatch(actionCreater(GET_RESTAURANT_PROFILE, details));
            // }
        })
        .catch(error => {
            console.log("get restaurant details error");
            this.setState({
                isPageUpdated: "false"
            });
            console.log(error);
            alert("Unable to get restaurant details, please try again!");
            dispatch(actionCreater(GET_RESTAURANT_PROFILE));
        })
    }
}

function getOrdersAsync(customerEmail, restaurantName) {
    return dispatch => {
        // let data;
        // if(customerEmail) {
        //     data = { userEmail: customerEmail };
        // }
        // else {
        //     data = { restaurantName };
        // }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        // axios.post('/getOrders', data)
        gqlConfig({
            query: getOrderQuery,
            variables: {'userEmail': customerEmail, 'restaurantName': restaurantName}
        })
            .then((response) => {
                // if (response.status === 200) {
                    console.log("getOrders response ", response.data);
                    const payload = response.data.orders;
                    dispatch(actionCreater(GET_ORDERS, payload));
                // }
            })
            .catch(error => {
                console.log("add order error");
                dispatch(actionCreater(GET_ORDERS));
                console.log(error);
                alert("Unable to add order, please try again!");
            })
    }
}

export { getAllDishesAsync, addDishAsync, deleteDishAsync, getRestaurantProfileAsync, getOrdersAsync }