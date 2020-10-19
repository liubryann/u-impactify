import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    auth: authReducer,
});

const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;