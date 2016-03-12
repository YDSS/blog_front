import React, {Component} from 'react';
import {pushState} from 'redux-router';
import {connect} from 'react-redux';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import moment from 'moment';
import * as diaryAction from '../../../action/diaryAction';
import {rawMarkup} from '../../../mixin/markup';
import Util from '../../../mixin/util'

import './view.scss';
import 'rc-calendar/assets/index.css';

const dateStringFormatter = new DateTimeFormat('yyyy-MM-dd');

class View extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            // 格式2015-12-22
            date: '',
            // markup之后的内容
            content: '',
            // calendar当前的年月
            calendarDate: ''
        };
    }

    /**
     * 选择日期时，请求数据并更新state
     *
     * @param {GregorianCalendar} date GregorianCalendar日期
     */
    onDateSelect(date) {
        let self = this;
        let {dispatch} = this.props;

        
        let dateString = dateStringFormatter.format(date);
        dispatch(pushState(null, `/diary/view/${dateString}`));
    }

    /**
     * next year/next month(pre)时触发，
     *  请求该年月对应的日记列表,
     *  通过参数date的年、月是否为当前年、月来判断
     *  是否需要加载列表（点击某个日期时onChange也会触发，需
     *  排除这种情况）
     *
     * @param {GregorianCalendar} date GregorianCalendar日期
     */
    onYearOrMonthChange(date) {
        let {dispatch} = this.props;
        let changedYear = date.getYear();
        // 日记的月和日都是两位数，即小余10用0补十位
        let changedMonth = Util.fillZero(date.getMonth() + 1);
        // 当前日记的日期
        let curDairyDate = Util.parseDiaryName(this.state.date);

        this.setState({
            calendarDate: `${changedYear}-${changedMonth}`
        });

        if (curDairyDate
            && (curDairyDate.year != changedYear || curDairyDate.month != changedMonth)) {
            dispatch(diaryAction.getDiariesByMonth(changedYear, changedMonth));
        }
    }

    disabledDate(current) {
        let {diary: {list}} = this.props;
        let dateString = dateStringFormatter.format(current);
        let curDiaryList = list.get(this.state.calendarDate);

        if (!curDiaryList || curDiaryList.length < 1) {
            return true;
        }
        else {
            let foundDiary = curDiaryList.find(item => item.dateString === dateString);
            return foundDiary == null;
        }
    }
    
    componentWillMount() {
        let self = this;
        let {dispatch, params: {date}} = this.props;

        // 当前日期
        let now = new Date();
        let curYear = now.getFullYear();
        let curMonth = Util.fillZero(now.getMonth() + 1);
        let curDay = now.getDate();

        /**
         * view的路由分两种，带日记日期的和不带的
         * 带日期的话直接加载该日期的日记，不带则加载最近一天的日记
         * 当月的日记列表无论哪种情况都要强制更新
         */
        if (!date) {
            // 请求当月的日记列表
            dispatch(diaryAction.getDiariesByMonth(curYear, curMonth, true))
                .then(() => {
                    // 请求最近一天的日记
                    dispatch(diaryAction.getLatestDiary(curYear, curMonth))
                        .then(action => {
                            if (action.error || !action.payload) {
                                return;
                            }

                            let diary = action.payload;
                            // 返回的结果更新页面
                            self.setState({
                                title: diary.title,
                                content: diary.content,
                                date: diary.dateString,
                                // dateString去掉最后的day即是日历时间
                                calendarDate: diary.dateString.replace(/-\d+$/, '')
                            });
                        });
                });
        }
        else {
            dispatch(diaryAction.getDiariesByMonth(curYear, curMonth, true))
                .then(() => {
                    dispatch(diaryAction.loadDiary(date))
                        .then(diary => {
                            self.setState({
                                title: diary.title,
                                content: diary.content,
                                date: diary.dateString,
                                // dateString去掉最后的day即是日历时间
                                calendarDate: diary.dateString.replace(/-\d+$/, '')
                            });
                        });
                });
        }
    }

    /**
     * 路由/diary/view/:date更新时请求新的日记信息
     *
     * @param {Object} nextProps 更新后的props
     */
    componentWillReceiveProps(nextProps) {
        let {dispatch, params: {date}} = nextProps;
        let self = this;

        if (date) {
            dispatch(diaryAction.loadDiary(date))
                .then(diary => {
                    self.setState({
                        title: diary.title,
                        content: diary.content,
                        date: diary.dateString
                    });
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
                className='header-date' 
                style={{display: !!date ? 'block' : 'none'}}>
                <i className='fa fa-calendar'></i>
                <span>{date && moment(date, 'YYYY-MM-DD').format('D MMMM, YYYY')}</span>
            </div>
        );
    }
    
    /**
     * 修改日记，跳转到/edit页面
     */
    edit() {
        const {dispatch} = this.props;

        dispatch(pushState(null, `/edit/diary/${this.state.date}`));
    }

    render() {
        let {title, content, date} = this.state;
        const auth = this.props.auth.auth;

        const calendar = (
            <Calendar
                showDateInput={false}
                disabledDate={this.disabledDate.bind(this)}
                onSelect={this.onDateSelect.bind(this)}
                onChange={this.onYearOrMonthChange.bind(this)}
            />
        );

        return (
            <div className="view">
                <article>
                    <h1>{title}</h1>
                    <div className='column'>
                        <DatePicker
                            animation='slide-up'
                            calendar={calendar}>
                            {this.createDateInput.bind(this)}
                        </DatePicker>
                    </div>
                    <div className="column">
                        <div 
                            style={{display: (auth ? 'block' : 'none')}}
                            className='header-btn-edit' 
                            onClick={this.edit.bind(this)}>
                            <i className='fa fa-edit'></i>
                            <span>EDIT</span>
                        </div>
                    </div>
                    <div 
                        className="content"
                        dangerouslySetInnerHTML={rawMarkup(content)}></div>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        diary: state.diary
    };
}

export default connect(
    mapStateToProps
)(View);
