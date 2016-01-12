import React, {Component} from 'react';
import Calendar from 'rc-calendar';

class View extends Component {

    render() {
        return (
            <div className="view">
                <div className="content">Hi there</div>
                <div className="calendar">
                    <Calendar /> 
                </div>
            </div>
        );
    }
}

export default View;
