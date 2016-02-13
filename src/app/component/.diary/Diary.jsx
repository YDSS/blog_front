import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Diary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // 用户选中的时间，也是日记的日期
            selectedDate: moment()
        };
    }

    // 查看选中日期的日记
    viewDiary(date) {

        this.setState({
            selectedDate: date
        });
    }

    showCalendar() {
        // 直接ref DatePicker组件无法获取到input的dom对象，故
        // 使用选择器直接获取，类名可以自定义，当前用的是datepicker__input
        let $datePicker = document.querySelector('.datepicker__input');
        $datePicker.click();
    }

    render() {
        return (
            <div className='diary-calendar'>
                <i 
                    ref='icon'
                    className='fa fa-calendar' 
                    onClick={this.showCalendar.bind(this)}
                ></i>
                <DatePicker
                    className='datepicker__input'
                    selected={this.state.selectedDate}
                    onChange={this.viewDiary.bind(this)}
                    showYearDropdown={false}
                    dateFormat='DD MMMM, YYYY'
                    popoverAttachment='top right'
                    popoverTargetOffset='-10px -60px'
                />
            </div>
        );
    }
}

export default Diary;
