import React, { Component } from 'react';
import { Link } from 'react-router';

class ListItem extends Component {

    constructor(props) { 
        super(props);
    }

    render() {
        const { data } = this.props;
        let tags;

        if (data.tags) {
            tags = (
                <div className='tags'>
                    {data.tags.map(this.createTag)}
                </div>
            );
        }

        return (
            <div className='list-item'>
                <h1 className='title'>{data.title}</h1>
                <div className='info-bar'>
                    <span className='time'>{data.time}</span>
                    {data.tags ? tags : null}
                </div>
                <p className='abs'>{data.abs}</p>
                <Link to={data.url}>前往</Link>
            </div>
        );
    }

    createTag(item, index) {
        return (
            <div className='tag' key={item + index}>{item}</div>
        );
    }
}

export default ListItem;
