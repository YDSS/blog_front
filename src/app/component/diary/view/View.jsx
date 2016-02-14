import React, {Component} from 'react';
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
            content: ''
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
        dispatch(diaryAction.loadDiary(dateString))
            .then(diary => {
                self.setState({
                    title: diary.title,
                    content: diary.content,
                    date: diary.dateString
                });
            });
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
        let parsedDate = this.getYearAndMonthFrom(this.state.date);
        let changedYear = date.getYear();
        let changedMonth = Util.fillZero(date.getMonth() + 1);

        if (parsedDate
            && (parsedDate.year != changedYear || parsedDate.month != changedMonth)) {
            dispatch(diaryAction.getDiariesByMonth(changedYear, changedMonth));
        }
        // 变更curKey
        dispatch(diaryAction.changeKey(changedYear, changedMonth));
    }

    /**
     * 解析日期(2015-01-22)的年、月
     *
     * @param {string} date 日期
     * @return {Object|null} 年、月
     */
    getYearAndMonthFrom(date) {
        if (date && typeof date === 'string'
           && this.validateDateFormat(date)) {
            let splits = date.split('-');

            return {
                year: splits[0],
                month: splits[1]
            };
        }
        else {
            return null;
        }
    }

    /**
     * 校验日期格式，2016-01-02
     *
     * @param {string} date 日期
     * @return {boolean}
     */
    validateDateFormat(date) {
        return /\d{4}\-\d{2}-\d{2}/.test(date);
    }

    disabledDate(current) {
        let {diary: {list, curKey}} = this.props;
        let dateString = dateStringFormatter.format(current);
        let curDiaryList = list.get(curKey);

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
        let {dispatch} = this.props;
        // 今天的年和月
        let now = new Date();
        let curYear = now.getFullYear();
        let curMonth = Util.fillZero(now.getMonth() + 1);
        let curDay = now.getDate();

        this.setState({
            date: `${curYear}-${curMonth}-${curDay}`
        });

        // 变更当月的curKey
        dispatch(diaryAction.changeKey(curYear, curMonth))
            .then((action) => {
                // 请求当月的日记列表
                dispatch(diaryAction.getDiariesByMonth(curYear, curMonth));
            })
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
                            date: diary.dateString
                        });
                    });
            });
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
                <span>{date && moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY')}</span>
            </div>
        );
    }

    render() {
        let {title, content, date} = this.state;
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
                    <div className="calendar">
                        <DatePicker
                            animation='slide-up'
                            calendar={calendar}>
                            {this.createDateInput.bind(this)}
                        </DatePicker>
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
