import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './container/app/App.jsx';
import Home from './container/home/Home.jsx';
import Editor from './container/editor/Editor.jsx';
import Article from './container/article/Article.jsx';
import Upload from './container/diary/upload/upload.jsx';
import Read from './container/diary/read/Read.jsx';

// normal react-router configure
let routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        // 写文章
        <Route path='edit' component={Editor} />
        // 修改文章或日记（通过type区分）
        <Route path='edit/:type/:id' component={Editor} />
        <Route path='diary'>
            // 看日记，作为日记的首页，展示最近的一篇日记
            <Route path='read' component={Read} />
            // 通过日期查看日记
            <Route path='read/:date' component={Read} />
            // 上传日记
            <Route path='upload' component={Upload} />
        </Route>
        <Route path='article/:id' component={Article} />
    </Route>
);
export default routes;
