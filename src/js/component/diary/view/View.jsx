import React, {Component} from 'react';
import {connect} from 'react-redux';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import * as diaryAction from '../../../action/diaryAction';

const dateFormatter = new DateTimeFormat('MMMM d, yyyy');
const dateStringFormatter = new DateTimeFormat('yyyy-MM-dd');

class View extends Component {

    onDateSelect(date) {
        let {dispatch} = this.props;
        let $content = this.refs.content;
        
        let dateString = dateStringFormatter.format(date);
        dispatch(diaryAction.loadDiary(dateString))
            .then(ret => {
                $content.innerHTML = ret.raw;
            });
    }

    // disabledDate(current) {
    //     let {noDiaryDate} = this.state;

    //     return noDiaryDate.find(day => day === current.fields[3]);
    // }
    
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
            <span>{value && dateFormatter.format(value) || new Date().toString()}</span>
        );
    }

    render() {
        const calendar = (
            <Calendar
                showDateInput={false}
                onSelect={this.onDateSelect.bind(this)}
            />
        );

        return (
            <div className="view">
                <div className="content" ref='content'>Hi there</div>
                <div className="calendar">
                    <DatePicker
                        animation='slide-up'
                        calendar={calendar}>
                        {this.createDateInput}
                    </DatePicker>
                </div>
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
