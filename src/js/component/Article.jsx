import React, { Component } from 'react';
import { rawMarkup } from '../mixin/markup.jsx';

class Article extends Component {

    render() {
        let { article: {list}, params } = this.props;
        let id = +params.id;

        let theArticle = list.find(item => {
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
