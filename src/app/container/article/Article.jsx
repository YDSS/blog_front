import React, { Component } from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import moment from 'moment';

import Page from '../../component/page/Page.jsx';
import DateLabel from '../../component/smallUI/dateLabel/DateLabel.jsx';
import EditBtn from '../../component/smallUI/editBtn/EditBtn.jsx';
import { rawMarkup } from '../../mixin/markup.js';

import './article.scss';
import 'github-markdown-css';
import '../../../scss/reset-markdown.scss';

@connect(
    state => ({article: state.article, auth: state.auth}),
    {pushState}
)
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
        const {pushState} = this.props;

        pushState(null, `/edit/article/${this.state.id}`);
    }

    render() {
        let {id, title, content, updatedAt} = this.state;
        // 权限设置，没有管理员权限不能使用edit
        const {auth} = this.props;

        return (
            <Page
                id={id}
                title={title}
                content={content}
                toolbar={{
                    DateComponent: <DateLabel date={updatedAt}/>,
                    EditBtn: (auth 
                        ? <EditBtn link={this.edit.bind(this)}/>
                        : null
                    )
                }}>
            </Page>
        );
        // return (
        //     <article className='article'>
        //         <header>
        //             <h1>{title}</h1>
        //             <div className='column'>
        //                 <div 
        //                     className='header-date' 
        //                     style={{display: !!updatedAt ? 'block' : 'none'}}>
        //                     <i className='fa fa-calendar'></i>
        //                     <span>{updatedAt && moment(new Date(updatedAt)).format('D MMMM, YYYY')}</span>
        //                 </div>
        //             </div>
        //             <div className="column">
        //                 <div 
        //                     style={{display: (auth ? 'block' : 'none')}}
        //                     className='header-btn-edit' 
        //                     onClick={this.edit.bind(this)}>
        //                     <i className='fa fa-edit'></i>
        //                     <span>EDIT</span>
        //                 </div>
        //             </div>
        //         </header>
        //         <p dangerouslySetInnerHTML={rawMarkup(content)}></p>
        //     </article>
        // );
    }

}

export default Article;
