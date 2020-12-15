import { 
    FETCH_LOCKER_GROUP, 
    FETCH_LOCKER_GROUP_ERROR, 
    LOCKER_RESERVATION, 
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_ERROR,
    FETCH_RESERVATION,
    FETCH_RESERVATION_ERROR,
    FETCH_LOCKER,
    FETCH_LOCKER_ERROR,
    LOADING 
} from '../actions/actionTypes';

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
        case FETCH_RESERVATIONS:
            return { ...state, loading: false, reservations: action.payload };
        case FETCH_RESERVATIONS_ERROR:
            return { message: action.payload, loading: false, ...initialState };
        case FETCH_RESERVATION:
            return { reservation: action.payload };
        case FETCH_RESERVATION_ERROR:
            return { message: action.payload, loading: false, ...initialState };
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