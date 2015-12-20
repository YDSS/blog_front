import React, { Component } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let createItem = (item, index) => {
            let iconClass = 'fa fa-' + item.icon;
            let $item;

            // 非router路由不能使用Link标签
            if (item.name.toLowerCase() === 'github') {
                $item = (
                    <a className='item' href={item.url} key={index + item.name}>
                        <i className={iconClass}/>
                        <span className="nav-title">{item.name}</span>
                    </a>
                );
            }
            else {
                $item = (
                    <Link className='item' to={item.url} key={index + item.name}>
                        <i className={iconClass}/>
                        <span className="nav-title">{item.name}</span>
                    </Link>
                );
            }

            return $item;
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
