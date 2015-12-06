import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import navItem from './navItem';
import article from './article';

const rootReducer = combineReducers({
    navItem: navItem,
    article: article,
    router: routerStateReducer
});

export default rootReducer;
