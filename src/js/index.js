import React, { Component } from 'react';
import { render } from 'react-dom';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'react-router';
import App from './container/App.jsx';
// import configureStore from './store/configureStore';
import rootReducer from './reducer/index';

// let store = configureStore();
let $wrap = document.getElementById('wrapper');

// <IndexRoute component={Content} />
// <Route path='article/:id' component={Article} />

const routes = (
    <Route path='/' component={App}>
        <Route path='home' component={Content} />
        <Route path='edit' component={Editor} />
    </Route>
);

const store = compose(
    reduxReactRouter({
        routers
    })
)(createStore)(rootReducer);

// render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     $wrap
// );
// render(
//     <Router>
//         <Route path='/' component={App}>
//             <IndexRoute component={Content} />
//             <Route path='home' component={Content} />
//             <Route path='edit' component={Editor} />
//             <Route path='article/:id' component={Article} />
//         </Route>
//     </Router>, 
//     $wrap
// );
