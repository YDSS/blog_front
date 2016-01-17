import React, {Component} from 'react';
import {connect} from 'react-redux';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import * as diaryAction from '../../../action/diaryAction';
import {rawMarkup} from '../../../mixin/markup.js';

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

    onDateSelect(date) {
        let self = this;
        let {dispatch} = this.props;
        
        let dateString = dateStringFormatter.format(date);
        dispatch(diaryAction.loadDiary(dateString))
            .then(ret => {
                self.setState({
                    title: ret.title,
                    content: ret.content,
                    date: ret.dateString
                });
            });
    }

    disabledDate(current) {
        let {diary} = this.props;
        let dateString = dateStringFormatter.format(current);

        let foundDiary = diary.list.find(item => item.dateString === dateString);
        return foundDiary == null;
    }
    
    componentWillMount() {
        let {dispatch} = this.props;
        // 今天的年和月
        let now = new Date();
        let curYear = now.getFullYear();
        let curMonth = now.getMonth() + 1;

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
