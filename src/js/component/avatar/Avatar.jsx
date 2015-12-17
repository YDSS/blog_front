import React, { Component } from 'react';

class Avatar extends Component {

    render() {
        return (
            <div className='avatar'>
                <img src={this.props.img} alt='avatar'/>
                <p>{this.props.title}</p>
            </div>
        );
    }
}

export default Avatar;
