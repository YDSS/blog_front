import React, { Component } from 'react';
import { getAllArticle } from '../action/articleAction';
import ListItem from './ListItem.jsx';

class Content extends Component {

    componentDidMount() {
        let { dispatch, articles } = this.props;

        // 若articles为空，向服务端请求首屏数据
        if (!articles || !articles.length) {
            dispatch(getAllArticle());
        } 
    }

    render() { 
        let { articles } = this.props;

        return (
            <div className='content'>
                {articles && articles.slice(0, 10).map(item => 
                    <ListItem data={item} key={item.id} />
                )}
            </div>
        );
    }
}

export default Content;
