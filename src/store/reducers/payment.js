import { PAYMENT, PAYMENT_ERROR, LOADING } from '../actions/actionTypes';

const initialState = { };

const payment = (state = initialState, action) => {
    switch(action.type) {
        case PAYMENT:
            return action.payload;
        case PAYMENT_ERROR:
            return { message: action.payload }
        case LOADING:
            return { loading: true, ...state };
        default:
            return state;
    }
};

export default payment;