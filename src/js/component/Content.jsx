import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

class Content extends Component {

    render() { 
        return (
            <div className='content'>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </div>
        );
    }
}

export default Content;
