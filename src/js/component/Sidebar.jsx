import React, { Component } from 'react';
import Avatar from './Avatar.jsx';
import Navbar from './Navbar.jsx';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: {
                title: 'YDSS',
                img: '/img/avatar.jpg'
            }
        };
    }

    render() {
        const { navItem } = this.props;

        return (
            <div className='sidebar'>
                <div className='bg'></div>
                <Avatar img={this.state.avatar.img} title={this.state.avatar.title} />
                <Navbar navItem={navItem} />
            </div>
        );
    }
}

export default Sidebar;
