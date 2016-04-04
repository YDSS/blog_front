import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DateLabel from '../../component/smallUI/dateLabel/DateLabel.jsx';
import {rawMarkup} from '../../mixin/markup';

import './artListItem.scss';

/**
 * /home即文章列表页文章item组件
 *
 * @author YDSS
 */
class ArtListItem extends Component {

    render() {
        const {item} = this.props;
        let {id, title, summary, tags, updatedAt} = item;
        // tags的JSX对象
        let Jtags;

        if (tags) {
            Jtags = (
                <div className='tags'>
                    {tags.map(this.createTag)}
                </div>
            );
        }

        return (
            <div className='list-item'>
                <h1 className='title'>{title}</h1>
                <div className='info-bar'>
                    <DateLabel date={updatedAt}/>
                    {tags ? Jtags : null}
                </div>
                <div 
                    className='abs'
                    dangerouslySetInnerHTML={rawMarkup(summary)}>
                </div>
                <div className='access-bar'>
                    <Link to={`/article/${id}`}>前往</Link>
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

ArtListItem.propTypes = {
    // 文章信息
    item: PropTypes.object.isRequired
};

export default ArtListItem;
