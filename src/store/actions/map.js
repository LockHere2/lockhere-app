import axios from 'axios';

import env from '../../env';
import { FETCH_LOCKERS, FETCH_LOCKERS_ERROR } from './actionTypes';
import OAuth from '../../model/OAuth';

export const fetchNearbyLockers = (long, lat) => {

    return async dispatch => {
        try {
            const { data } = await axios.get(`${env.apiUrl}/locker/lockers/long/${long}/lat/${lat}`, 
                { headers: OAuth.headers });

            return dispatch({
                type: FETCH_LOCKERS,
                payload: data
            });
        } catch(err) {
            const { data } = err.response;

            return dispatch({
                type: FETCH_LOCKERS_ERROR,
                payload: data.message
            });
        }
        
    }
};
