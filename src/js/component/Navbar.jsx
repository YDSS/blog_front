import React, { Component } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {

    constructor(props) {
        super(props);

        let navItem = [
            {
                name: 'HOME',
                icon: 'home',
                url: '/home'
            },
            {
                name: 'EDIT',
                icon: 'pencil',
                url: '/edit'
            },
            {
                name: 'TAG',
                icon: 'tags',
                url: '/tag'
            },
            {
                name: 'ABOUT',
                icon: 'question',
                url: '/about'
            },
            {
                name: 'Github',
                icon: 'github',
                url: '//github.com/YDSS'
            }
        ];
        this.state = {
            navItem: navItem
        };
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

        return (
            <nav className='nav'>
                {this.state.navItem.map(createItem)}
            </nav>
        );
    }
}

export default Navbar;
