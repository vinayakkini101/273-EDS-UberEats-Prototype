import axios from 'axios';
import { actionCreater } from '../actions/index.js';

import { ADD_DISH, DELETE_DISH, GET_ALL_DISHES, GET_RESTAURANT_PROFILE } from '../constants/action-types';
import { GET_ORDERS } from '../constants/action-types';

function getAllDishesAsync(payload) {
    return (dispatch, getState) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('/getAllDishes', {
                        params: {
                            restaurantEmail: payload
                        }
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response handleGetAllDishes ", response.data);
                    let dishList = [];
                    for(let document of response.data) {
                        if(document.dishes.length > 0) {
                            document.dishes.restaurantEmail = document.email;
                            Array.prototype.push.apply(dishList, document.dishes);
                        }
                    }
                    dispatch(actionCreater(GET_ALL_DISHES, dishList));
                }
            })
            .catch(error => {
                console.log("Get all dishes error");
                this.setState({
                    isPageUpdated: "false"
                });
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
        axios.post('/addNewDish', {
                ...payload, 
                restaurantEmail: localStorage.getItem('userEmail'),
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response in addNewDish ", response.data);
                    payload.dishCode = response.data;
                    dispatch(actionCreater(ADD_DISH, payload));
                }
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
        axios.post('/getRestaurantProfile', {
            restaurantEmail: payload
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("response ", response.data);
                const details = response.data;
                dispatch(actionCreater(GET_RESTAURANT_PROFILE, details));
            }
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
        let data;
        if(customerEmail) {
            data = { userEmail: customerEmail };
        }
        else {
            data = { restaurantName };
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('/getOrders', data)
            .then((response) => {
                if (response.status === 200) {
                    console.log("getOrders response ", response.data);
                    const payload = response.data;
                    dispatch(actionCreater(GET_ORDERS, payload));
                }
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