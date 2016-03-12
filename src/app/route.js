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
        // 写文章
        <Route path='edit' component={Editor} />
        // 修改文章或日记（通过type区分）
        <Route path='edit/:type/:id' component={Editor} />
        <Route path='diary'>
            // 上传日记
            <Route path='upload' component={Upload} />
            // 看日记，作为日记的首页，展示最近的一篇日记
            <Route path='view' component={View} />
            // 通过日期查看日记
            <Route path='view/:date' component={View} />
        </Route>
        <Route path='article/:id' component={Article} />
    </Route>
);
export default routes;
