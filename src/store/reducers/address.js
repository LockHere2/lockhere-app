import { FETCH_ADDRESSES, FETCH_ADDRESSES_ERROR } from '../actions/actionTypes';

const initialState = { };

const address = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ADDRESSES:
            return { addresses: action.payload };
        case FETCH_ADDRESSES_ERROR:
            return { message: action.payload }
        default:
            return state;
    }
};

export default address;