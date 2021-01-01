import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { user, map, address, locker, payment, reserve } from './reducers';

const rootReducer = combineReducers({
    user,
    map,
    address,
    locker,
    payment,
    reserve
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
