import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from './store/configureStore';
import routes from './route'

import 'normalize.css';
import 'font-awesome-webpack';
import '../scss/index.scss';

// create store without initial state
let store = configureStore();
// html entry point
let $wrap = document.getElementById('wrapper');

let rootInstance = render(
    <Provider store={store}>
        <ReduxRouter>
            {routes}
        </ReduxRouter>
    </Provider>,
    $wrap
);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            return [rootInstance];
        }
    });
}
