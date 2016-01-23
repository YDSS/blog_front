import React, { Component } from 'react';
import Avatar from '../avatar/Avatar.jsx';
import Navbar from '../navbar/Navbar.jsx';

import './sidebar.scss';

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navItem, author, avatar } = this.props;

        return (
            <div className='sidebar'>
                <div className='bg'></div>
                <Avatar />
                <Navbar navItem={navItem} />
            </div>
        );
    }
}

export default Sidebar;
