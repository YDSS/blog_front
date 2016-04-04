import React, {Component, PropTypes} from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';

import './dateInput.scss';
import 'rc-calendar/assets/index.css';

/**
 * 日期组件，可以选择日期
 *
 * @author YDSS
 */
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
            ? moment(date).format('DD MMMM, YYYY')
            : '';

        return (
            <div 
                style={{display: (hasDate ? 'block' : 'none')}}>
                <i className='fa fa-calendar'></i>
                <span>{formatDate}</span>
            </div>
        );
    }

    render() {
        const {disabledDate, onSelect, onChange} = this.props;
        /**
         * Calendar的事件属性，比如onSelect的default值为function() {}
         * 而这些事件都不是DateInput的required属性，因此声明出来填充未填项
         */
        const defaultFnVal = function() {};
        const calendar = (
            <Calendar
                showDateInput={false}
                disabledDate={disabledDate ? disabledDate : defaultFnVal}
                onSelect={onSelect ? onSelect : defaultFnVal}
                onChange={onChange ? onChange : defaultFnVal}
            />
        );

        return (
            <div className='date-input'>
                <DatePicker
                    animation='slide-up'
                    calendar={calendar}>
                    {this.createDateInput.bind(this)}
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
