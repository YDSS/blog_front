import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import navItem from './navItem';
import article from './article';
import auth from './auth';

const rootReducer = combineReducers({
    navItem: navItem,
    article: article,
    auth: auth,
    router: routerStateReducer
});

export default rootReducer;
