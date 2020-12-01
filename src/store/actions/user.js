import axios from 'axios';

import env from '../../env';
import OAuth from '../../model/OAuth';
import { 
    LOGIN, 
    LOGIN_ERROR, 
    SIGNUP, 
    SIGNUP_ERROR, 
    UPDATE_PASSWORD, 
    UPDATE_PASSWORD_ERROR,
    UPDATE_BASE_INFO,
    UPDATE_BASE_INFO_ERROR } from './actionTypes';
import UserValidator from '../../validators/UserValidator';
import { formatBrToUs } from '../../utils/DateUtils';

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

export const updatePassword = (password, repassword) => {
    return async dispatch => {
        try {
            const { data } = await axios.patch(`${env.apiUrl}/users/user/update/password`, { password, repassword }, { headers: OAuth.headers });
            console.log(data)
            return dispatch({
                type: UPDATE_PASSWORD,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: UPDATE_PASSWORD_ERROR,
                payload: { message: data.message }
            });
        }
    }
}

export const updateBaseInfo = ({ name, cpf, born }) => {
    born = formatBrToUs(born);

    return async dispatch => {
        try {
            const { data } = await axios.patch(`${env.apiUrl}/users/user/update/base_info`, { name, cpf, born }, { headers: OAuth.headers });
            console.log(data)
            return dispatch({
                type: UPDATE_BASE_INFO,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;
            console.log(data)
            return dispatch({
                type: UPDATE_BASE_INFO_ERROR,
                payload: { message: data.message }
            });
        }
    }
}
