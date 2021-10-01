import { RECORD_DETAILS, STORE_USERNAME } from "../constants/action-types";

const initialState = {
    username: '',
    isRestaurant: '',
    userDetails: {
        userEmail: ''
    },
    restaurantDetails: {
        restaurantEmail: ''
    }
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case STORE_USERNAME:
            console.log('processing STORE_USERNAME in the reducer');
            return {...state, username: action.payload.username};
        case RECORD_DETAILS:
            console.log('processing RECORD_DETAILS in the reducer');
            if(action.payload.isRestaurant === 'false') {
                return {...state, 
                    isRestaurant: action.payload.isRestaurant, 
                    userDetails: {
                        userEmail: action.payload.userEmail
                    }
                }
            }
            else if(action.payload.isRestaurant === 'true') {
                return {...state, 
                    isRestaurant: action.payload.isRestaurant, 
                    restaurantDetails: {
                        restaurantEmail: action.payload.restaurantEmail
                    }
                }
            }
            break;
        default:
            return state;
    }
}