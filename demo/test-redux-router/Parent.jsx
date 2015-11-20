import React, { Component } from 'react';

class Parent extends Component {

    render() {
        return (
            <div>
                <h2>Parent</h2>
                {this.props.children}
            </div>
        );
    }
}

export default Parent;
