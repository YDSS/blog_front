import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

class Content extends Component {

    constructor(props) {
        super(props);
    }

    render() { 
        const { list } = this.props;

        return (
            <div className='content'>
                {list.map(item => 
                    <ListItem data={item} />
                )}
            </div>
        );
    }
}

export default Content;
