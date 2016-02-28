import React, { Component } from 'react';
import { pushState } from 'redux-router';
import Calendar from 'rc-calendar';
import moment from 'moment';
import DatePicker from 'rc-calendar/lib/Picker';

import { rawMarkup } from '../../mixin/markup.js';
import * as articleAction from '../../action/articleAction';

import './editor.scss';

class Editor extends Component {

    constructor(props) { 
        super(props);

        this.state = {
            placeholder: 'write something?',
            text: '',
            date: null,
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
     *
     * @type {LifeCircle}
     */
    componentWillMount() {
        let {params} = this.props;
        if (params.id) {
            let {article: {list, curPage}} = this.props;

            // 文章ID
            let id = +params.id;
            let curPageList = list.get(curPage);
            let article = curPageList.find(item => {
                return item.id === id;
            });

            this.setState({
                text: article.raw,
                // 修改文章时更新时间置为当前时间
                date: new Date(),
                isAdd: false
            });
        }
    }

    /**
     * Datepicker的子元素，显示当前时间
     *  DatePicker组件必须传递children，用来显示输入框
     *
     * @param {Object} state datepicker的状态
     *  @property {GregorianCalendar} value 选中的日期
     *  @property {boolean} open datepicker是否被打开（显示calendar）
     *
     * @return {Object} jsx对象
     */
    createDateInput() {
        let {date} = this.state;

        return (
            <div 
                className='date' 
                style={{display: !!date ? 'block' : 'none'}}>
                <i className='fa fa-calendar'></i>
                <span>{date && moment(date).format('D MMMM, YYYY')}</span>
            </div>
        );
    }

    /**
     * 更新state.date
     *
     * @param {GregorianCalendar} date GregorianCalendar日期
     */
    onChangeDate(date) {
        // state.date是从后端传过来的，在存储时直接使用的new Date()
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
        const { dispatch } = this.props;
        const refs = this.refs;
        const raw = refs.textarea.value; 
        const {isAdd} = this.state;
        
        // add new article
        if (isAdd) {
            dispatch(articleAction.addArticle(raw))
                .then(() => {
                    // route to home
                    dispatch(pushState(null, '/home'));
                })
                .catch(err => {
                    console.log(err.message);   
                });
        }
        else {
            let {date} = this.state;
            let {params: {id}} = this.props;

            // 数据库里的id是number
            id = +id;
            dispatch(articleAction.updateArticle({
                id,
                raw,
                date
            }))
                .then(action => {
                    // 跳转到正文页
                    dispatch(pushState(null, `/article/${action.payload.id}`));
                });
        }
    }

    render() {
        const prevState = this.state.preview;
        let displayText = prevState ? 'none' : 'block';
        let displayView = prevState ? 'block' : 'none';

        const calendar = (
            <Calendar
                showDateInput={false}
                onSelect={this.onChangeDate.bind(this)}
            />
        );

        return (
            <div className='editor'>
                <div className="calendar">
                    <DatePicker
                        animation='slide-up'
                        calendar={calendar}>
                        {this.createDateInput.bind(this)}
                    </DatePicker>
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
