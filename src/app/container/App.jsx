import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../component/sidebar/Sidebar.jsx';
import Header from '../component/header/Header.jsx';

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

        return (
            <div id='app'>
                <Header />
                <Sidebar navItem={navItem} />
                <div className="body markdown-body">
                    {children && this.renderChildren(other)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // state.router is state of redux-router for routing
        // must be return as name router
        router: state.router,
        navItem: state.navItem,
        auth: state.auth,
        article: state.article
    }
}


export default connect(
    mapStateToProps
)(App);
