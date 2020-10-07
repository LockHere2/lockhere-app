import { FETCH_LOCKER_GROUP, FETCH_LOCKER_GROUP_ERROR, LOCKER_RESERVATION, LOADING } from '../actions/actionTypes';

const initialState = { 
    lockerGroup: { address: {}, lockers: [] }, 
    reservation: {} 
};

const locker = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOCKER_GROUP:
            return { lockerGroup: action.payload };
        case FETCH_LOCKER_GROUP_ERROR:
            return { message: action.payload, ...initialState };
        case LOCKER_RESERVATION:
            return { ...state, reservation: action.payload };
        case LOADING:
            return { loading: true, ...state };
        default:
            return state;
    }
};

export default locker;