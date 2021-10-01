import { RECORD_DETAILS, STORE_USERNAME } from '../constants/action-types.js';

export function storeUsername(payload) {
    console.log('Dispatching storeUsername action');
    return {type: STORE_USERNAME, payload};
}

export function recordDetails(payload) {
    return {type: RECORD_DETAILS, payload};
}