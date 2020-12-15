import axios from 'axios';

import env from '../../env';
import {
    FETCH_LOCKER,
    FETCH_LOCKER_ERROR, 
    FETCH_LOCKER_GROUP, 
    FETCH_LOCKER_GROUP_ERROR, 
    LOCKER_RESERVATION, 
    CREATE_RESERVATION, 
    CREATE_RESERVATION_ERROR, 
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_ERROR,
    UPDATE_RESERVATION_STATUS,
    UPDATE_RESERVATION_STATUS_ERROR,
    FETCH_RESERVATION,
    FETCH_RESERVATION_ERROR,
    LOADING 
} from './actionTypes';
import OAuth from '../../model/OAuth';
import { diff } from '../../utils/DateUtils';

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

export const createReservation = (reservation) => {

    return async dispatch => {
        dispatch({
            type: LOADING
        });
    
        try {
            await axios.post(`${env.apiUrl}/reserve`,
                reservation,
                { headers: OAuth.headers });
    
            return dispatch({
                type: CREATE_RESERVATION
            });
        } catch (err) {
            const { data } = err.response;
            return dispatch({
                type: CREATE_RESERVATION_ERROR,
                payload: data.message
            });
        }
    }
}

export const fetchUserReservations = (params = { orderBy, status, direction}) => {
    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.get(`${env.apiUrl}/reserve`, { params, headers: OAuth.headers });

            return dispatch({
                type: FETCH_RESERVATIONS,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;
            return dispatch({
                type: FETCH_RESERVATIONS_ERROR,
                payload: data.message
            });
        }
    }
}

export const fetchReservationById = (id) => {
    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.get(`${env.apiUrl}/reserve/${id}`, { headers: OAuth.headers });

            return dispatch({
                type: FETCH_RESERVATION,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;
            return dispatch({
                type: FETCH_RESERVATION_ERROR,
                payload: data.message
            });
        }
    }
}

export const updateUserReservationStatus = (id, status) => {
    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            await axios.put(`${env.apiUrl}/reserve/${id}/status/${status}`, null, { headers: OAuth.headers });

            return dispatch({
                type: UPDATE_RESERVATION_STATUS
            });
        } catch (err) {
            const { data } = err.response;
            return dispatch({
                type: UPDATE_RESERVATION_STATUS_ERROR,
                payload: data.message
            });
        }
    }
}

export const handleReservation = (reservation) => {
    return {
        type: LOCKER_RESERVATION,
        payload: reservation
    }
}

export const updateReservationPrice = (reservation) => {
    const { start_date, end_date, hour_price } = reservation;
    const minutes = diff(start_date, end_date, 'minutes');
    reservation.price = +((minutes / 60) * hour_price).toFixed(2);
    return handleReservation(reservation);
}
