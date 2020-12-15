import { PAYMENT, PAYMENT_ERROR } from '../actions/actionTypes';

const initialState = { };

const payment = (state = initialState, action) => {
    switch(action.type) {
        case PAYMENT:
            return action.payload;
        case PAYMENT_ERROR:
            return { message: action.payload }
        default:
            return state;
    }
};

export default payment;