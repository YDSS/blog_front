import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import navItem from './navItem';
import article from './article';
import auth from './auth';
import diary from './diary';

const rootReducer = combineReducers({
    navItem: navItem,
    article: article,
    auth: auth,
    diary: diary,
    router: routerStateReducer
});

export default rootReducer;
