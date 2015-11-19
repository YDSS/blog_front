import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { Router, Route, IndexRoute, Link } from 'react-router';
import App from './container/App.jsx';
import configureStore from './store/configureStore';
// import Content from './component/Content.jsx';
// import Editor from './component/Editor.jsx';
// import Article from './component/Article.jsx';

let store = configureStore();
let $wrap = document.getElementById('wrapper');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    $wrap
);
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
