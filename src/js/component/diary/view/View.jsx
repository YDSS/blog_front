import React, {Component} from 'react';
import Calendar from 'rc-calendar';

class View extends Component {

    constructor(props) {
        super(props);

        this.state = {
            noDiaryDate: [1, 5, 10]
        };
    }

    onDateChange(date) {
        console.log(date);
    }

    disabledDate(current) {
        let {noDiaryDate} = this.state;

        return noDiaryDate.find(day => day === current.fields[3]);
    }

    render() {
        return (
            <div className="view">
                <div className="content">Hi there</div>
                <div className="calendar">
                    <Calendar 
                        showDateInput={false}
                        onChange={this.onDateChange.bind(this)}
                        disabledDate={this.disabledDate.bind(this)}
                    /> 
                </div>
            </div>
        );
    }
}

export default View;
