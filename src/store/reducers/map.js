import { FETCH_LOCKERS, FETCH_LOCKERS_ERROR } from '../actions/actionTypes';

const initialState = { };

const map = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOCKERS:
            return { lockers: action.payload };
        case FETCH_LOCKERS_ERROR:
            return { message: action.payload }
        default:
            return state;
    }
};

export default map;