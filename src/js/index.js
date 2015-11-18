import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from './container/App.jsx';
import Content from './component/Content.jsx';
import Editor from './component/Editor.jsx';
import Article from './component/Article.jsx';

let $wrap = document.getElementById('wrapper');

render(
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Content} />
            <Route path='home' component={Content} />
            <Route path='edit' component={Editor} />
            <Route path='article/:id' component={Article} />
        </Route>
    </Router>, 
    $wrap
);
