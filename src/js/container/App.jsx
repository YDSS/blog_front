import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../component/Sidebar.jsx';

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
            <div className='app' id='app'>
                <Sidebar navItem={navItem} />
                {children && this.renderChildren(other)}
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
        article: state.article
    }
}


export default connect(
    mapStateToProps
)(App);
