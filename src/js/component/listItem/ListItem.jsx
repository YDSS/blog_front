import React, { Component } from 'react';
import { Link } from 'react-router';

class ListItem extends Component {

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
                    created at: <span className='time'>{new Date(data.createdAt).toString()}</span>
                    updated at: <span className='time'>{new Date(data.updatedAt).toString()}</span>
                    {data.tags ? tags : null}
                </div>
                <p className='abs'>{data.summary}</p>
                <Link to={`/article/${data.id}`}>前往</Link>
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
