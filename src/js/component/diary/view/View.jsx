import React, {Component} from 'react';
import {connect} from 'react-redux';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import * as diaryAction from '../../../action/diaryAction';
import {rawMarkup} from '../../../mixin/markup.js';

import './view.scss';
import 'rc-calendar/assets/index.css';

const dateFormatter = new DateTimeFormat('MMMM d, yyyy');
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
            .then(json => {
                let diary = json.payload; 

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
        let changedMonth = this.fillZero(date.getMonth() + 1);

        if (parsedDate
            && (parsedDate.year != changedYear || parsedDate.month != changedMonth)) {
            dispatch(diaryAction.getDiariesByMonth(changedYear, changedMonth));
        }
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

    /**
     * 月、日不足两位补0
     *
     * @param {string|number} date 月或日
     * @return {string}
     */
    fillZero(date) {
        date = '' + date;
        if (date && date.length < 2) {
            return '0' + date; 
        }
        else {
            return date;
        }
    }

    disabledDate(current) {
        let {diary: {list, curKey}} = this.props;
        let dateString = dateStringFormatter.format(current);
        let curDiaryList = list.get(curKey);

        if (!curDiaryList || curDiaryList.length < 1) {
            return false;
        }
        else {
            let foundDiary = curDiaryList.find(item => item.dateString === dateString);
            return foundDiary == null;
        }
    }
    
    componentWillMount() {
        let {dispatch} = this.props;
        // 今天的年和月
        let now = new Date();
        let curYear = now.getFullYear();
        let curMonth = this.fillZero(now.getMonth() + 1);
        let curDay = now.getDate();

        this.setState({
            date: `${curYear}-${curMonth}-${curDay}`
        });

        dispatch(diaryAction.getDiariesByMonth(curYear, curMonth));
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
    createDateInput({value}) {
        return (
            <div className='date'>
                <i className='fa fa-calendar'></i>
                <span>{value && dateFormatter.format(value) || new Date().toString()}</span>
            </div>
        );
    }

    render() {
        let {title, content, dateString} = this.state;
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
                            {this.createDateInput}
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
