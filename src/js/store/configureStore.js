import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import rootReducer from '../reducer/index';

let logger = createLogger();
// compose middlewares
let middleware = [thunk, logger];
// create store with initial state
export default function configureStore(initialState) {
    const store = compose(
        applyMiddleware(...middleware),
        // compose redux-rooter to enhance store
        reduxReactRouter({ createHistory })
    )(createStore)(rootReducer, initialState);
        
    return store;
}
