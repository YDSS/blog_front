import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {apiMiddleware} from 'redux-api-middleware';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import rootReducer from '../reducer/index';

let logger = createLogger();
// compose middlewares
let middleware = [thunk, apiMiddleware];
// create store with initial state
export default function configureStore(initialState) {
    const store = compose(
        applyMiddleware(...middleware),
        // compose redux-rooter to enhance store
        reduxReactRouter({ createHistory })
    )(createStore)(rootReducer, initialState);
        
    return store;
}
