import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

class App extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        dispatch(pushState(null, '/parent/child/custom'))
    }

    render() {
        const links = [
            '/',
            '/parent?foo=bar',
            '/parent/child?bar=baz',
            '/parent/child/123?baz=foo'
        ].map(l =>
            <p key={l}>
                <Link to={l}>{l}</Link>
            </p>
        );

        return (
            <div>
                <h1>App Container</h1>
                {links}

                <a href='#' onClick={this.handleClick}>
                    /parent/child/custom
                </a>
                {this.props.children}
            </div>
        );
    }
}

export default connect(state => ({}))(App);
            
