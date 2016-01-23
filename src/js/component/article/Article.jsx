import React, { Component } from 'react';
import { rawMarkup } from '../../mixin/markup.js';

import './article.scss';

class Article extends Component {

    render() {
        let { article: {list, curPage}, params } = this.props;
        let id = +params.id;
        let curPageList = list.get(curPage);

        let theArticle = curPageList.find(item => {
            return item.id === id;
        });
        
        return (
            <article
                className='article'
                dangerouslySetInnerHTML={rawMarkup(theArticle.raw)}
            />
        );
    }

}

export default Article;
