import { 
    FETCH_LOCKER_GROUP, 
    FETCH_LOCKER_GROUP_ERROR,
    FETCH_LOCKER,
    FETCH_LOCKER_ERROR,
    LOADING 
} from '../actions/actionTypes';

const initialState = { 
    lockerGroup: { address: {}, lockers: [] }
};

const locker = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOCKER_GROUP:
            return { lockerGroup: action.payload };
        case FETCH_LOCKER_GROUP_ERROR:
            return { message: action.payload, ...initialState };
        case FETCH_LOCKER:
            return { ...state, locker: action.payload, loading: false };
        case FETCH_LOCKER_ERROR:
            return { message: action.payload, loading: false, ...initialState };
        case LOADING:
            return { loading: true, ...state };
        default:
            return state;
    }
};

export default locker;