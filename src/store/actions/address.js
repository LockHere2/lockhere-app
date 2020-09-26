import axios from 'axios';

import env from '../../env';
import { FETCH_ADDRESSES, FETCH_ADDRESSES_ERROR } from './actionTypes';
import OAuth from '../../model/OAuth';

export const fetchAddresses = (q) => {
    return async dispatch => {
        try {
            if (!q) {
                return cleanFetchAddress();
            }

            const { data } = await axios.get(`${env.apiUrl}/address/all`,
                { headers: OAuth.headers, params: { q } });

            return dispatch({
                type: FETCH_ADDRESSES,
                payload: data
            });
        } catch (err) {
            const { data } = err.response;

            return dispatch({
                type: FETCH_ADDRESSES_ERROR,
                payload: data.message
            });
        }
    }
}

export const cleanFetchAddress = () => {
    return {
        type: FETCH_ADDRESSES,
        payload: []
    }
}
