import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/Sidebar.jsx';
import Header from '../../component/header/Header.jsx';

@connect(state => ({
    // state.router is state of redux-router for routing
    // must be return as name router
    router: state.router
}))
class App extends Component {

    render() {
        // 头像url，Header组件和Sidebar组件都用到，因此在app中保存
        const avatarUrl = require('../../../img/avatar.png');
        // 头像title
        const name = 'YDSS';

        return (
            <div id='app'>
                <Header avatarUrl={avatarUrl}/>
                <Sidebar avatarUrl={avatarUrl} name={name}/>
                <div className="body markdown-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
