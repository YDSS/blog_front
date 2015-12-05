import React, { Component } from 'react';
import { rawMarkup } from '../mixin/markup.jsx';

class Article extends Component {

    render() {
        let {articles, params} = this.props;
        let id = +params.id;

        let article = articles.find(item => {
            return item.id === id;
        });
        
        return (
            <article
                className='article'
                dangerouslySetInnerHTML={rawMarkup(article.raw)}
            />
        );
    }

}

export default Article;
