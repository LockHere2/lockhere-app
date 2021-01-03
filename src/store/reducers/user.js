import { 
    LOGIN, 
    LOGIN_ERROR, 
    SIGNUP, 
    SIGNUP_ERROR,
    UPDATE_PASSWORD, 
    UPDATE_PASSWORD_ERROR,
    UPDATE_BASE_INFO,
    UPDATE_BASE_INFO_ERROR,
    SEND_CONFIRM_CODE,
    SEND_CONFIRM_CODE_ERROR,
    UPDATE_EMAIL,
    UPDATE_EMAIL_ERROR,
    PROFILE,
    PROFILE_ERROR,
    LOADING } from '../actions/actionTypes';

const initialState = { profile: {} };

const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return action.payload;
        case LOGIN_ERROR:
            return { errors: { login: action.payload } };
        case PROFILE:
            return { profile: action.payload, loading: false };
        case PROFILE_ERROR:
            return { errors: { profile: action.payload } };
        case SIGNUP_ERROR:
            return { errors: { signup: action.payload } };
        case SIGNUP:
            return action.payload;
        case UPDATE_PASSWORD:
            return action.payload;
        case UPDATE_PASSWORD_ERROR:
            return { errors: { updatePassword: action.payload } };
        case UPDATE_BASE_INFO:
            return action.payload;
        case UPDATE_BASE_INFO_ERROR:
            return { errors: { updateBaseInfo: action.payload } };
        case SEND_CONFIRM_CODE:
            return action.payload;
        case SEND_CONFIRM_CODE_ERROR:
            return { errors: { confirmCode: action.payload } };
        case UPDATE_EMAIL:
            return action.payload;
        case UPDATE_EMAIL_ERROR:
            return { errors: { email: action.payload } };
        case LOADING:
            return { loading: true, ...state };
        default:
            return state;
    }
};

export default user;
