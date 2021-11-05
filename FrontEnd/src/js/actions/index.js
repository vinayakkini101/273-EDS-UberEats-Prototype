import { GET_ALL_DISHES } from '../constants/action-types.js';

function actionCreater(type, payload) {
    console.log(`dispatching ${type} action`);
    return { type, payload };
}

export { actionCreater }