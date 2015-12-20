import React, { Component } from 'react';
import Avatar from '../avatar/Avatar.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Diary from '../diary/Diary.jsx';

class Sidebar extends Component {

    static defaultProps = {
        // 我的用户名
        author: 'YDSS',
        // 头像url
        avatar: '/img/avatar.png'
    }
    
    constructor(props) {
        super(props);
    }

    render() {
        const { navItem, author, avatar } = this.props;

        return (
            <div className='sidebar'>
                <div className='bg'></div>
                <Avatar img={avatar} title={author} />
                <Navbar navItem={navItem} />
                <Diary />
            </div>
        );
    }
}

export default Sidebar;
