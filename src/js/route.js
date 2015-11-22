import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './container/App.jsx';
import Content from './component/Content.jsx';
import Editor from './component/Editor.jsx';
import Article from './component/Article.jsx';

// normal react-router configure
let routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Content} />
        <Route path='home' component={Content} />
        <Route path='edit' component={Editor} />
        <Route path='article/:id' component={Article} />
    </Route>
);
export default routes;
