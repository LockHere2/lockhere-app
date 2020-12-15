import axios from 'axios';

import env from '../../env';
import { PAYMENT, PAYMENT_ERROR } from './actionTypes';
import OAuth from '../../model/OAuth';

export const createPaymentPaypal = (transactions) => {

    return async dispatch => {
        try {
            const { data } = await axios.post(`${env.apiUrl}/paypal/create-payment`, { transactions }, { headers: OAuth.headers });
            console.log(data)
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