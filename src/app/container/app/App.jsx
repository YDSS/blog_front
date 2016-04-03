import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/Sidebar.jsx';
import Header from '../../component/header/Header.jsx';

@connect(state => ({
    // state.router is state of redux-router for routing
    // must be return as name router
    router: state.router,
    navItem: state.navItem,
    diary: state.diary,
    auth: state.auth
}))
class App extends Component {

    renderChildren(...props) {
        return React.Children.map(
            this.props.children,
            child => {
                return React.cloneElement(
                    child,
                    ...props
                )
            }
        );
    }

    render() {
        const { children,  navItem, ...other } = this.props;
        // 头像url，Header组件和Sidebar组件都用到，因此在app中保存
        const avatarUrl = require('../../../img/avatar.png');
        // 头像title
        const name = 'YDSS';

        return (
            <div id='app'>
                <Header avatarUrl={avatarUrl}/>
                <Sidebar avatarUrl={avatarUrl} name={name}/>
                <div className="body markdown-body">
                    {children && this.renderChildren(other)}
                </div>
            </div>
        );
    }
}

export default App;
