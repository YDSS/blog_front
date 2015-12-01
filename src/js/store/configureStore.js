import { createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import rootReducer from '../reducer/index';

// create store with initial state
export default function configureStore(initialState) {
    const store = compose(
        // compose redux-rooter to enhance store
        reduxReactRouter({ createHistory }),
        // redux异步数据流插件
        thunk
    )(createStore)(rootReducer, initialState);
        
    return store;
}
