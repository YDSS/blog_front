import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './container/App.jsx';
import Home from './component/home/Home.jsx';
import Editor from './component/editor/Editor.jsx';
import Article from './component/article/Article.jsx';
import Upload from './component/diary/upload/Upload.jsx';
import View from './component/diary/view/View.jsx';

// normal react-router configure
let routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='edit' component={Editor} />
        <Route path='edit/:id' component={Editor} />
        <Route path='diary'>
            <Route path='upload' component={Upload} />
            <Route path='view' component={View} />
        </Route>
        <Route path='article/:id' component={Article} />
    </Route>
);
export default routes;
