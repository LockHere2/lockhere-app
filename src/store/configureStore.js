import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { user, map, address } from './reducers';

// key value par reducers
const rootReducer = combineReducers({
    user,
    map,
    address
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
