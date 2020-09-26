import axios from 'axios';

import env from '../../env';
import { LOGIN, LOGIN_ERROR, SIGNUP, SIGNUP_ERROR } from './actionTypes';
import UserValidator from '../../validators/UserValidator';

export const login = (user = { email, password }) => {
    const validator = UserValidator.login(user);
    if (!validator.isValid) {
        return {
            type: LOGIN_ERROR,
            payload: { ...validator.errors }
        }
    }

    return async dispatch => {
        try {
            const { data, status } = await axios.post(`${env.apiUrl}/users/login`, user);

            return dispatch({
                type: LOGIN,
                payload: { status, ...data }
            });
        } catch (err) {
            const { data } = err.response;
            return dispatch({
                type: LOGIN_ERROR,
                payload: { message: data.message }
            });
        }

    }
}

export const signup = (user = { name, email, password, repassword, cpf, born }) => {
    const validator = UserValidator.signup(user);
    if (!validator.isValid) {
        return {
            type: SIGNUP_ERROR,
            payload: { ...validator.errors }
        }
    }

    return async dispatch => {
        try {
            const { data } = await axios.post(`${env.apiUrl}/users/signup`, user);

            return dispatch({
                type: SIGNUP,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: SIGNUP_ERROR,
                payload: { message: data.message }
            });
        }
    }
}
