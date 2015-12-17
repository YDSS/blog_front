import React, { Component } from 'react';
import Avatar from '../avatar/Avatar.jsx';
import Navbar from '../navbar/Navbar.jsx';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: {
                title: 'YDSS',
                img: '/img/avatar.png'
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
