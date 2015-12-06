import React, { Component } from 'react';
import { getArticleByPage } from '../action/articleAction';
import ListItem from './ListItem.jsx';

class Content extends Component {

    componentDidMount() {
        let { dispatch, article: {list, pageSize} } = this.props;

        // 若article.list为空，向服务端请求首屏数据
        if (!list || !list.length) {
            dispatch(getArticleByPage(0, pageSize));
        } 
    }

    render() { 
        let { article: {list, pageSize} } = this.props;

        return (
            <div className='content'>
                {list && list.slice(0, pageSize).map(item => 
                    <ListItem data={item} key={item.id} />
                )}
            </div>
        );
    }
}

export default Content;
