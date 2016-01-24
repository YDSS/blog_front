import React, { Component } from 'react';

import './avatar.scss';

class Avatar extends Component {

    static defaultProps = {
        // 我的用户名
        author: 'YDSS',
        // 头像url
        avatar: require('../../../img/avatar.png')
    };

    render() {
        return (
            <div className='avatar'>
                <img src={this.props.avatar} alt='avatar'/>
                <p>{this.props.author}</p>
            </div>
        );
    }
}

export default Avatar;
