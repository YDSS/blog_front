import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import {rawMarkup} from '../../mixin/markup';

import './listItem.scss';

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

        // 更新时间和创建时间都是mysql Date类型
        let {updatedAt} = data;
        let formatPattern = 'DD MMMM, YYYY';
        let updatedAtFormat = moment(new Date(updatedAt)).format(formatPattern);

        return (
            <div className='list-item'>
                <h1 className='title'>{data.title}</h1>
                <div className='info-bar'>
                    <i className='fa fa-calendar'></i><span className='time'>{updatedAtFormat}</span>
                    {data.tags ? tags : null}
                </div>
                <div 
                    className='abs'
                    dangerouslySetInnerHTML={rawMarkup(data.summary)}>
                </div>
                <div className='access-bar'>
                    <Link to={`/article/${data.id}`}>前往</Link>
                </div>
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
