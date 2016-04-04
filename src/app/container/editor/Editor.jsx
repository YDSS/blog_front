import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';

import DateInput from '../../component/smallUI/dateInput/DateInput.jsx';
import {rawMarkup} from '../../mixin/markup';
import * as articleAction from '../../action/articleAction';
import * as diaryAction from '../../action/diaryAction';
import Util from '../../mixin/util';

import './editor.scss';

@connect(
    state => ({article: state.article, diary: state.diary}),
    {pushState}
)
class Editor extends Component {

    constructor(props) { 
        super(props);

        this.state = {
            placeholder: 'write something?',
            text: '',
            // 文章类型，修改文章有article和diary两种，写文章只有article
            type: 'article',
            // 文章id，或者是diary的dateString
            id: null, 
            date: new Date(),
            preview: false,
            /**
             * @type {Boolean}
             * Edit分两种状态：新增文章和修改文章，以路由参数中id是否为空区分
             */
            isAdd: true
        }
    }

    /**
     * 如果是修改文章，先从cache中取文章的raw和更新时间
     */
    componentWillMount() {
        let {params: {id, type}} = this.props;

        // 通过type是否存在来判断是新增还是修改
        if (type) {
            if (type === 'article') {
                let {article: {list, curPage}} = this.props;

                // 数据库里id是number类型
                id = +id;
                let curPageList = list.get(curPage);
                let article = curPageList.find(item => {
                    return item.id === id;
                });

                this.setState({
                    text: article.raw,
                    date: article.updatedAt,
                    isAdd: false,
                    id
                });
            }
            else if (type === 'diary') {
                let {diary: {list}} = this.props;
                let diaryDateInfo = Util.parseDiaryName(id);
                let key = `${diaryDateInfo.year}-${diaryDateInfo.month}`;

                let diaryList = list.get(key);

                let diary = diaryList.find(item => {
                    return item.dateString === id;
                });

                this.setState({
                    // diary的markdown在数据库里title和content是分开存的，这里需要合并起来
                    text: `${diary.content}`,
                    date: diary.updatedAt,
                    isAdd: false,
                    type,
                    id
                });
            }
        }
    } 

    /**
     * 更新state.date
     *
     * @param {GregorianCalendar} date GregorianCalendar日期
     */
    onChangeDate(date) {
        // state.date是从后端传过来的，在存储时直接使用js原生的Date
        // 在这里需要把GregorianCalendar转成原生Date类型
        let originalDate = new Date(date.getTime());

        this.setState({
            date: originalDate
        });
    }
    
    /**
     * 预览文章
     *
     * @event
     */
    onPreviewClick() {
        const refs = this.refs;
        let preView = refs.view;
        let textarea = refs.textarea;

        this.setState({
            text: textarea.value,
            preview: !this.state.preview
        });
    }

    /**
     * 提交，新增或修改
     *
     * @event
     */
    onSubmit() {
        const {dispatch, pushState} = this.props;
        const refs = this.refs;
        const raw = refs.textarea.value; 
        const {isAdd} = this.state;
        
        // 写文章
        if (isAdd) {
            dispatch(articleAction.addArticle(raw))
                .then(() => {
                    // route to home
                    pushState(null, '/home');
                })
                .catch(err => {
                    console.log(err.message);   
                });
        }
        else {
            let {date, id, type} = this.state;

            switch (type) {
                case 'article':
                    dispatch(articleAction.updateArticle({
                        id,
                        raw,
                        date
                    }))
                        .then(action => {
                            // 跳转到正文页
                            pushState(null, `/article/${action.payload.id}`);
                        });

                    break;

                case 'diary':
                    dispatch(diaryAction.updateDairy({
                        dateString: id,
                        content: raw,
                        date
                    }))
                        .then(action => {
                            // 跳转到diary read页
                            pushState(null, `/diary/read/${action.payload.dateString}`);
                        });
            }
        }
    }

    render() {
        const {date, preview} = this.state;
        // const prevState = this.state.preview;
        let displayText = preview ? 'none' : 'block';
        let displayView = preview ? 'block' : 'none';

        return (
            <div className='editor'>
                <div className='datepicker'>
                    <DateInput 
                        date={date}
                        onSelect={this.onChangeDate.bind(this)}/>
                </div>
                <textarea
                    placeholder={this.state.placeholder} 
                    defaultValue={this.state.text} 
                    ref='textarea'
                    style={{display: displayText}}
                />
                <div 
                    className='preview-view' 
                    ref='view' 
                    style={{display: displayView}} 
                    dangerouslySetInnerHTML={rawMarkup(this.state.text)}
                />
                <div className='btns'>
                    <div 
                        className='btn' 
                        ref='preview' 
                        onClick={this.onPreviewClick.bind(this)}>
                        {this.state.preview ? 'Back' : 'Preview'}
                    </div>
                    <div
                        className='btn'
                        ref='submit'
                        onClick={this.onSubmit.bind(this)}>
                        submit
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;
