import React, {Component} from 'react';
import {render} from 'react-dom';
import DatePicker from 'react-datepicker'; 
import moment from 'moment';

let $wrap = document.getElementById('wrapper');

class Example extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment()
        };
    }

    handleChange(ev) {
        debugger;
    }

    render() {
        return (
            <div className='example'>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showYearDropdown={false}
                    dateFormat='DD MMMM, YYYY'
                />
            </div>
        );
    }

}

render(<Example />, $wrap);
                
