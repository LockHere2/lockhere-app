import axios from 'axios';

import env from '../../env';
import { PAYMENT, PAYMENT_ERROR, LOADING } from './actionTypes';
import OAuth from '../../model/OAuth';

export const createPaymentPaypal = (transactions) => {

    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.post(`${env.apiUrl}/paypal/create-payment`, transactions, { headers: OAuth.headers });

            return dispatch({
                type: PAYMENT,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: PAYMENT_ERROR,
                payload: data.message
            });
        }
    }

}

export const refundPaymentPaypal = (reservationId) => {
    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.put(`${env.apiUrl}/paypal/refund-payment/${reservationId}`, {}, { headers: OAuth.headers });

            return dispatch({
                type: PAYMENT,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: PAYMENT_ERROR,
                payload: data.message
            });
        }
    }
}

export const updatePaymentTransactionReservationId = (paymentTransactionId, reservationId) => {
    return async dispatch => {
        dispatch({
            type: LOADING
        });

        try {
            const { data } = await axios.put(`${env.apiUrl}/payment-transaction/${paymentTransactionId}`, { reservation_id: reservationId }, { headers: OAuth.headers });

            return dispatch({
                type: PAYMENT,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: PAYMENT_ERROR,
                payload: data.message
            });
        }
    }
}