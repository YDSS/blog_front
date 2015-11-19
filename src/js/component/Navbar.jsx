import React, { Component } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let createItem = (item, index) => {
            let iconClass = 'fa fa-' + item.icon;

            return (
                <Link className='item' to={item.url} key={index + item.name}>
                    <i className={iconClass}/>
                    <span className="nav-title">{item.name}</span>
                </Link>
            );
        };
        const { navItem } = this.props;

        return (
            <nav className='nav'>
                {navItem.map(createItem)}
            </nav>
        );
    }
}

export default Navbar;
