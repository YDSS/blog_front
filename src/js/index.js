import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Link } from 'react-router';
import { ReduxRouter } from 'redux-router';
import App from './container/App.jsx';
import Content from './component/Content.jsx';
import Editor from './component/Editor.jsx';
import Article from './component/Article.jsx';
import configureStore from './store/configureStore';
import routes from './route'

// create store without initial state
let store = configureStore();
// html entry point
let $wrap = document.getElementById('wrapper');

render(
    <Provider store={store}>
        <ReduxRouter>
            {routes}
        </ReduxRouter>
    </Provider>,
    $wrap
);

