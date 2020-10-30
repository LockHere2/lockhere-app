import axios from 'axios';

import env from '../../env';
import { 
    FETCH_LOCKER_GROUP, 
    FETCH_LOCKER_GROUP_ERROR, 
    LOCKER_RESERVATION, 
    CREATE_RESERVATION, 
    CREATE_RESERVATION_ERROR, 
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_ERROR,
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

export const createReservation = (reservation) => {

    return async dispatch => {
        dispatch({
            type: LOADING
        });
    
        try {
            await axios.post(`${env.apiUrl}/locker/reserve`,
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

export const fetchUserReservations = () => {
    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.get(`${env.apiUrl}/locker/reserve`, { headers: OAuth.headers });

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

export const handleReservation = (reservation) => {
    return {
        type: LOCKER_RESERVATION,
        payload: reservation
    }
}

export const updateReservationPrice = (reservation) => {
    const { startDate, endDate, hour_price } = reservation;
    const minutes = diff(startDate, endDate, 'minutes');
    reservation.price = +((minutes / 60) * hour_price).toFixed(2);
    return handleReservation(reservation);
}
