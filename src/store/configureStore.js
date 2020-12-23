import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { user, map, address, locker, payment } from './reducers';

const rootReducer = combineReducers({
    user,
    map,
    address,
    locker,
    payment
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
