import axios from 'axios';
import * as firebase from 'firebase';

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
    UPDATE_BASE_INFO_ERROR,
    SEND_CONFIRM_CODE,
    SEND_CONFIRM_CODE_ERROR,
    UPDATE_EMAIL,
    UPDATE_EMAIL_ERROR, 
    PROFILE,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_ERROR,
    LOADING } from './actionTypes';
import { formatBrToUs } from '../../utils/DateUtils';

export const login = (user = { email, password }) => {
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
    user.born = formatBrToUs(user.born);

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

export const profile = () => {
    return async dispatch => {
        dispatch({ 
            type: LOADING 
        });

        try {
            const { data } = await axios.get(`${env.apiUrl}/users/profile`, { headers: OAuth.headers });

            return dispatch({
                type: PROFILE,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: PROFILE_ERROR,
                payload: { message: data.message }
            });
        }
    }
}

export const updatePassword = (password, repassword) => {
    return async dispatch => {
        try {
            const { data } = await axios.patch(`${env.apiUrl}/users/user/update/password`, { password, repassword }, { headers: OAuth.headers });

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

export const updateEmail = (email, code) => {
    return async dispatch => {
        try {
            const { data } = await axios.patch(`${env.apiUrl}/users/user/update/email`, { email, code }, { headers: OAuth.headers });

            return dispatch({
                type: UPDATE_EMAIL,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: UPDATE_EMAIL_ERROR,
                payload: { message: data.message }
            });
        }
    }
}

export const updateBaseInfo = ({ name, cpf, born, image }) => {
    born = formatBrToUs(born);

    return async dispatch => {
        try {
            const { data } = await axios.patch(`${env.apiUrl}/users/user/update/base_info`, { name, cpf, born, image }, { headers: OAuth.headers });

            return dispatch({
                type: UPDATE_BASE_INFO,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: UPDATE_BASE_INFO_ERROR,
                payload: { message: data.message }
            });
        }
    }
}

export const sendConfirmCode = (action) => {

    return async dispatch => {
        try {
            await axios.post(`${env.apiUrl}/users/user/send-confirm-code`, { action }, { headers: OAuth.headers });

            return dispatch({
                type: SEND_CONFIRM_CODE,
                payload: { success: true }
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: SEND_CONFIRM_CODE_ERROR,
                payload: { message: data.message }
            });
        }
    }

}

export const uploadProfileImage = (imageName, path) => {
    return async dispatch => {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
              resolve(xhr.response);
            };
            xhr.onerror = function(e) {
              console.log(e);
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', path, true);
            xhr.send(null);
        });

        try {
            await firebase.storage().ref().child(imageName).put(blob);
            await blob.close();
            const url = await firebase.storage().ref(imageName).getDownloadURL();
            await axios.patch(`${env.apiUrl}/users/user/update/image`, { image: url }, { headers: OAuth.headers });
            return dispatch({
                type: UPLOAD_PROFILE_IMAGE,
                payload: url
            });
        } catch(err) {
            const { data } = err.response;
            console.log(data);
            return dispatch({
                type: UPLOAD_PROFILE_IMAGE_ERROR,
                payload: { message: 'Falha no upload da imagem' }
            });
        }
    }
}
