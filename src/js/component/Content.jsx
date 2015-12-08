import React, { Component } from 'react';
import { getArticleByPage } from '../action/articleAction';
import ListItem from './ListItem.jsx';
import Pagination from './Pagination.jsx';

class Content extends Component {

    /**
     * 获取翻页后的数据，如果没有缓存则请求后端获取
     */
    fetchArticlesIfNeed() {
        
    }

    componentDidMount() {
        let { dispatch, article: {list, pageSize} } = this.props;

        // 若article.list为空，向服务端请求首屏数据
        if (!list || !list.length) {
            dispatch(getArticleByPage(1, pageSize));
        } 
    }

    render() { 
        let { article: {list, pageSize, articleSum}, dispatch } = this.props;

        return (
            <div className='content'>
                <div className='list-group'>
                    {list && list.slice(0, pageSize).map(item => 
                        <ListItem data={item} key={item.id} />
                    )}
                </div>
                <Pagination maxPage={7} articleSum={articleSum} pageSize={pageSize} dispatch={dispatch} /> 
            </div>
        );
    }
}

export default Content;
