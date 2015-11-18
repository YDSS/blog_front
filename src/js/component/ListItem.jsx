import React, { Component } from 'react';
import { Link } from 'react-router';

class ListItem extends Component {

    constructor(props) { 
        super(props);

        var item = {
            id: '123',
            title: 'test1111',
            abs: 'Protocol Buffers具体参见 Google 开发文档： https: //develop',
            time: '2015.11.07',
            url: '/article/:123',
            tags: [
                'node',
                'react',
                'requirejs'
            ]
        };

        this.state = {
            data: item
        };
    }

    render() {
        var tags;

        if (this.state.data.tags) {
            tags = (
                <div className='tags'>
                    {this.state.data.tags.map(this.createTag)}
                </div>
            );
        }

        return (
            <div className='list-item'>
                <h1 className='title'>{this.state.data.title}</h1>
                <div className='info-bar'>
                    <span className='time'>{this.state.data.time}</span>
                    {this.state.data.tags ? tags : null}
                </div>
                <p className='abs'>{this.state.data.abs}</p>
                <Link to={this.state.data.url}>前往</Link>
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
