import { 
    LOGIN, 
    LOGIN_ERROR, 
    SIGNUP, 
    SIGNUP_ERROR,
    UPDATE_PASSWORD, 
    UPDATE_PASSWORD_ERROR } from '../actions/actionTypes';

const initialState = { };

const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return action.payload;
        case SIGNUP_ERROR:
            return { errors: { signup: action.payload } };
        case LOGIN_ERROR:
            return { errors: { login: action.payload } };
        case SIGNUP:
            return action.payload;
        case UPDATE_PASSWORD:
            return action.payload;
        case UPDATE_PASSWORD_ERROR:
            return { errors: { updatePassword: action.payload } };
        default:
            return state;
    }
};

export default user;
