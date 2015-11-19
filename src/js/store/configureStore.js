import { createStore } from 'redux';
import rootReducer from '../reducer/index';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState);

    return store;
}
