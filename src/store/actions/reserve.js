import axios from 'axios';

import env from '../../env';
import OAuth from '../../model/OAuth';
import { diff } from '../../utils/DateUtils';
import {
    LOCKER_RESERVATION, 
    CREATE_RESERVATION, 
    CREATE_RESERVATION_ERROR, 
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_ERROR,
    UPDATE_RESERVATION_STATUS,
    UPDATE_RESERVATION_STATUS_ERROR,
    FETCH_RESERVATION,
    FETCH_RESERVATION_ERROR,
    FINISH_RESERVATION,
    FINISH_RESERVATION_ERROR,
    LOADING 
} from './actionTypes';

export const createReservation = (reservation) => {

    return async dispatch => {
        dispatch({
            type: LOADING
        });
    
        try {
            const { data } = await axios.post(`${env.apiUrl}/reserve`,
                reservation,
                { headers: OAuth.headers });

            return dispatch({
                type: CREATE_RESERVATION,
                payload: data
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

export const finishReservation = (id, price) => {

    return async dispatch => {
        dispatch({
            type: LOADING
        });
    
        try {
            await axios.put(`${env.apiUrl}/reserve/${id}/finish`, { price }, { headers: OAuth.headers });

            return dispatch({
                type: FINISH_RESERVATION
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: FINISH_RESERVATION_ERROR,
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