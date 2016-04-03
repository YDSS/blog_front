import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(
    state => ({diary: state.diary})
)
class Diary extends Component {

    render() {
        return (
            <div className="diary">
                {this.props.children}
            </div>
        );
    }
}

export default Diary;
