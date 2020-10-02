import { FETCH_LOCKER_GROUP, FETCH_LOCKER_GROUP_ERROR } from '../actions/actionTypes';

const initialState = { };

const locker = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOCKER_GROUP:
            return { lockerGroup: action.payload };
        case FETCH_LOCKER_GROUP_ERROR:
            return { message: action.payload }
        default:
            return state;
    }
};

export default locker;