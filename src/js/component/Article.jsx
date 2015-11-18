import React, { Component } from 'react';
import { rawMarkup } from './mixin/markup.jsx';

class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: '## Test Article\n```js\nvar a = 1;\n```'
        }
    }

    render() {
        return (
            <article
                className='article'
                dangerouslySetInnerHTML={rawMarkup(this.state.content)}
            />
        );
    }

}

export default Article;
