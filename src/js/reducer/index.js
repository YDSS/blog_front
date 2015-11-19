import { combineReducers } from 'redux';
import navItem from './navItem';
import articleList from './articleList';

const rootReducer = combineReducers({
    navItem,
    articleList
});

export default rootReducer;
