import { 
    LOCKER_RESERVATION, 
    CREATE_RESERVATION, 
    CREATE_RESERVATION_ERROR, 
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_ERROR,
    FETCH_RESERVATION,
    FETCH_RESERVATION_ERROR,
    FINISH_RESERVATION,
    FINISH_RESERVATION_ERROR, 
    LOADING } from '../actions/actionTypes';

const initialState = { reservation: {} };

const reserve = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_RESERVATION:
            return { ...state, reservation: action.payload };
        case CREATE_RESERVATION_ERROR:
            return { message: action.payload, loading: false, ...initialState };
        case LOADING:
            return { loading: true, ...state };
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
        case FINISH_RESERVATION:
            return { ...state, locker: action.payload, loading: false };
        case FINISH_RESERVATION_ERROR:
            return { message: action.payload, loading: false, ...initialState };
        default:
            return state;
    }
};

export default reserve;