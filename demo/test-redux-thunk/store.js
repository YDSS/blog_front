import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

let createStoreWithMiddleware = applyMiddleware(
    logger,
    thunk
)(createStore);
let store = createStoreWithMiddleware(rootReducer);

export default store;

