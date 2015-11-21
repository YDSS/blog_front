import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

class Content extends Component {

    render() { 
        const { articleList } = this.props;

        return (
            <div className='content'>
                {articleList.map(item => 
                    <ListItem data={item} key={item.id} />
                )}
            </div>
        );
    }
}

export default Content;
