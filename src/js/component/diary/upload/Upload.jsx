import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as diaryAction from '../../../action/diaryAction';

import './upload.scss';

class Upload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEnter: false
        };
    }
    
    onDragEnter(ev) {
        ev.preventDefault();

        this.setState({
            isEnter: true
        });
    }

    onDragLeave(ev) {
        ev.preventDefault();

        this.setState({
            isEnter: false
        });
    }

    onDragOver(ev) {
        ev.preventDefault();
    }

    onDrop(ev) {
        ev.preventDefault();
        
        this.setState({
            isEnter: false
        });

        let {dispatch} = this.props;
        let file = ev.dataTransfer.files[0];
        let formData = new FormData();
        formData.append('uploadFile', file);
        
        dispatch(diaryAction.upload(formData));

        // let dir = 'diary';
        // fetch(`/file/upload?dir=${dir}`, {
        //     method: 'post',
        //     body: formData
        // });
    }

    render() {
        let {isEnter} = this.state;

        return (
            <div className='upload'>
                <div 
                    className={'drag-area' + (isEnter ? ' enter' : '')}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragOver={this.onDragOver.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                    onDrop={this.onDrop.bind(this)}
                    ></div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        diary: state.diary
    };
}

export default connect(mapStateToProps)(Upload);
