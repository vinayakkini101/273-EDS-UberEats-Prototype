import { ADD_DISH, DELETE_DISH, GET_ALL_DISHES } from '../constants/action-types.js';
const initialState = {
    dishDetails: {
        dishcode: '',
        dishname: '',
        ingredients: '',
        description: '',
        category: '',
        price: '',
        imageLink: '',
        imageName: ''
    },
    dishList: []
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_DISH:
            console.log('in adddish reducer');
            return {
                ...state,
                dishList: [...state.dishList, action.payload]
            };
        case GET_ALL_DISHES:
            console.log('in getalldishes reducer');
            return {
                ...state,
                dishList: action.payload
            };
        case DELETE_DISH:
            console.log('res ', state.dishList.filter(item => item.dishCode !== action.payload.dishCode));
            console.log('in deletedish reducer');
            return {
                ...state, 
                dishList: state.dishList.filter(item => item.dishCode !== action.payload.dishCode)
            };
        default: 
    }

    return state;
}

export default rootReducer;