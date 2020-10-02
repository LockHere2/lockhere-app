import axios from 'axios';

import env from '../../env';
import { FETCH_LOCKER_GROUP, FETCH_LOCKER_GROUP_ERROR } from './actionTypes';
import OAuth from '../../model/OAuth';

export const fetchLockersByGroupId = (id) => {

    return async dispatch => {
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