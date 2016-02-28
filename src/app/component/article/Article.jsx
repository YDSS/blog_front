import React, { Component } from 'react';
import {pushState} from 'redux-router';
import moment from 'moment';

import { rawMarkup } from '../../mixin/markup.js';

import './article.scss';
// import '../../../css/markdown.css';
import 'github-markdown-css';
import '../../../scss/reset-markdown.scss';

class Article extends Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            content: '',
            /**
             * @type {Date}
             */
            updatedAt: null
        };
    } 

    /**
     * 在正文加载前，获取正文数据，
     * 因分页时已经取到了数据，所以直接从cache中找即可
     *
     * @type {LifeCircle}
     */
    componentWillMount() {
        let {article: {list, curPage}, params} = this.props;

        // 文章ID
        let id = +params.id;
        let curPageList = list.get(curPage);
        let article = curPageList.find(item => {
            return item.id === id;
        });

        this.setState({
            id: article.id,
            title: article.title,
            content: article.content,
            updatedAt: article.updatedAt
        });
    }

    /**
     * 修改文章，跳转到/edit页面
     */
    edit() {
        const {dispatch} = this.props;

        dispatch(pushState(null, `/edit/${this.state.id}`));
    }

    render() {
        let {title, content, updatedAt} = this.state;
        
        return (
            <article className='article'>
                <header>
                    <h1>{title}</h1>
                    <div className='column'>
                        <div 
                            className='header-div-date' 
                            style={{display: !!updatedAt ? 'block' : 'none'}}>
                            <i className='fa fa-calendar'></i>
                            <span>{updatedAt && moment(updatedAt, 'YYYY-MM-DD').format('D MMMM, YYYY')}</span>
                        </div>
                    </div>
                    <div className="column">
                        <div className='header-btn-edit' onClick={this.edit.bind(this)}>
                            <i className='fa fa-edit'></i>
                            <span>EDIT</span>
                        </div>
                    </div>
                </header>
                <p dangerouslySetInnerHTML={rawMarkup(content)}></p>
            </article>
        );
    }

}

export default Article;
