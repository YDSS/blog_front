import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import navItem from './navItem';
import articleList from './article';

const rootReducer = combineReducers({
    navItem: navItem,
    articleList: articleList,
    router: routerStateReducer
});

export default rootReducer;
