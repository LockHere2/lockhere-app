import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { user, map, address, locker } from './reducers';

const rootReducer = combineReducers({
    user,
    map,
    address,
    locker
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
