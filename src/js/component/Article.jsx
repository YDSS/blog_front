import React, { Component } from 'react';
import { rawMarkup } from '../mixin/markup.jsx';

class Article extends Component {

    render() {
        let {articles, params: {id}} = this.props;
        id = +id.replace(/^\:/, '');

        debugger
        let article = articles.find(item => {
            return item.id === id;
        });
        
        return (
            <article
                className='article'
                dangerouslySetInnerHTML={rawMarkup(article.content)}
            />
        );
    }

}

export default Article;
