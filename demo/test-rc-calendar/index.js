import React, {Component} from 'react';
import {render} from 'react-dom';
import Calendar from 'rc-calendar';
import moment from 'moment';

let $wrap = document.getElementById('wrapper');

class Example extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment()
        };
    }

    onChange(date) {
        debugger;
    }

    render() {
        return (
            <div className='example'>
                <Calendar 
                    onChange={this.onChange}
                />
            </div>
        );
    }

}

render(<Example />, $wrap);
                
