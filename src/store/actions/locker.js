import axios from 'axios';

import env from '../../env';
import OAuth from '../../model/OAuth';
import {
    FETCH_LOCKER,
    FETCH_LOCKER_ERROR, 
    FETCH_LOCKER_GROUP, 
    FETCH_LOCKER_GROUP_ERROR,
    LOADING 
} from './actionTypes';

export const fetchLockersByGroupId = (id) => {

    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.get(`${env.apiUrl}/locker/lockers/locker-group/${id}`,
                { headers: OAuth.headers });

            return dispatch({
                type: FETCH_LOCKER_GROUP,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: FETCH_LOCKER_GROUP_ERROR,
                payload: data.message
            });
        }
    };
}

export const fetchLockerById = (id) => {

    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.get(`${env.apiUrl}/locker/${id}`, { headers: OAuth.headers });

            return dispatch({
                type: FETCH_LOCKER,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: FETCH_LOCKER_ERROR,
                payload: data.message
            });
        }
    };
}


