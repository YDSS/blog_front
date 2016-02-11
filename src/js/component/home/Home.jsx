import React, { Component } from 'react';
import {fetchArticleByPage, updateCurPage} from '../../action/articleAction';
import ListItem from '../listItem/ListItem.jsx';
import Pagination from '../pagination/Pagination.jsx';

import './home.scss';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // 总页数，通过计算pageSize和articleSum得到
            pageSum: 1
        };
    }

    componentDidMount() {
        // 装载Content时直接取第一页的数据
        this.fetchPageListIfNeeded(1);
    }

    componentWillReceiveProps(nextProps) {
        let {article: {pageSize, articleSum}} = nextProps;
        let oldArticleSum = this.props.articleSum;

        // 更新总页数
        if (articleSum !== oldArticleSum 
            &&  articleSum > 0) 
        {
            this.setState({
                pageSum: Math.ceil(articleSum / pageSize)
            });
        }
    }

    /**
     * 获取翻页后的数据，如果没有缓存则请求后端获取
     *
     * @param {number} curPage 当前页码
     */
    fetchPageListIfNeeded(curPage) {
        let {dispatch, article: {list, pageSize}} = this.props;
        let curPageList = list.get(curPage);

        if (!curPageList) {
            dispatch(fetchArticleByPage(curPage, pageSize));
        }
        else {
            dispatch(updateCurPage(curPage));
        }
    }

    render() { 
        let { article: {list, curPage, pageSize, articleSum}, dispatch } = this.props;
        let curPageList = list.get(curPage);

        return (
            <div className='home'>
                <div className='list-group'>
                    {curPageList && curPageList.slice(0, pageSize).map(item => 
                        <ListItem data={item} key={item.id} />
                    )}
                </div>
                <Pagination 
                    maxPage={7} 
                    pageSum={this.state.pageSum} 
                    paginate={this.fetchPageListIfNeeded.bind(this)}
                    curPage={curPage}
                /> 
            </div>
        );
    }
}

export default Home;
