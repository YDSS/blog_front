import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Avatar from '../../component/avatar/Avatar.jsx';
import Navbar from '../../component/navbar/Navbar.jsx';

import './sidebar.scss';

@connect(
    state => ({navItem: state.navItem})
)
class Sidebar extends Component {

    render() {
        const {navItem, avatarUrl, name} = this.props;

        return (
            <div className='sidebar'>
                <div className='bg'></div>
                <Avatar avatarUrl={avatarUrl} name={name}/>
                <Navbar navItem={navItem}/>
            </div>
        );
    }
}

Sidebar.propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Sidebar;
