import React, {Component, PropTypes} from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';

import './dateInput.scss';

class DateInput extends Component {

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
        let {date} = this.props;
        let hasDate = !!date;
        let formatDate = hasDate 
            ? moment(date, 'YYYY-MM-DD').format('D MMMM, YYYY')
            : '';

        return (
            <div 
                className='header-date'
                style={{display: (hasDate ? 'block' : 'none')}}>
                <i className='fa fa-calendar'></i>
                <span>{formatDate}</span>
            </div>
        );
    }

    render() {
        const {disabledDate, onSelect, onChange} = this.props;
        const calendar = (
            <Calendar
                showDateInput={false}
                disabledDate={disabledDate ? disabledDate : null}
                onSelect={onSelect ? onSelect : null}
                onChange={onChange ? onChange : null}
            />
        );

        return (
            <div className='date-input'>
                <DatePicker
                    animation='slide-up'
                    calendar={calendar}>
                    {this.createDateInput}
                </DatePicker>
            </div>
        );
    }
}

DateInput.PropTypes = {
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]),
    /** 
     *  操作calendar的事件函数，直接透传给rc-calendar
     */
    /* calendar option begin */
    disabledDate: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func
    /* calendar option end */
};

export default DateInput;
