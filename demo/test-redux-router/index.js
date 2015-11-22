import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import Parent from './Parent.jsx';
import Child from './Child.jsx';
import { combineReducers, createStore, compose } from 'redux';
import { 
    ReduxRouter, 
    reduxReactRouter, 
    pushState, 
    routerStateReducer 
} from 'redux-router';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { createHistory } from 'history';

const reducer = combineReducers({
    router: routerStateReducer
});

const store = compose(
    reduxReactRouter({ createHistory })
)(createStore)(reducer);

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <ReduxRouter>
                    <Route path='/' component={App}>
                        <Route path='parent' component={Parent}>
                            <Route path='child' component={Child} />
                            <Route path='child/:id' component={Child} />
                        </Route>
                    </Route>
                </ReduxRouter>
            </Provider>
        );
    }
}

render(
    <Root />,
    document.getElementById('wrapper')
);
