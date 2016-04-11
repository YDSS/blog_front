import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import * as diaryAction from '../../../action/diaryAction';

import './fileUpload.scss';

/**
 * 文件上传组件，暂不支持多文件上传
 *
 * @author YDSS
 */
class FileUpload extends Component {

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

        const {upload} = this.props;
        // let {dispatch} = this.props;
        let file = ev.dataTransfer.files[0];
        let formData = new FormData();
        formData.append('uploadFile', file);

        upload(formData);
        
        // dispatch(diaryAction.upload(formData));
    }

    render() {
        let {isEnter} = this.state;

        return (
            <div className='comp-fileupload'>
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

FileUpload.propTypes = {
    /**
     * 上传文件需要做的操作，组件会把拖入的文件以formData的形式
     *  作为参数传给upload方法
     *
     * 该函数会在onDrop事件中执行
     */
    upload: PropTypes.func.isRequired
}

// function mapStateToProps(state) {
//     return {
//         diary: state.diary
//     };
// }

export default FileUpload;
