import store from './store';
import * as action from './action';

store.dispatch(action.request({
    id: 1
}));
