import React, {Component} from 'react';
import {connect} from 'react-redux';
import {upload as uploadAction} from '../../../action/diaryAction';

import FileUpload from '../../../component/fileUpload/FileUpload.jsx';

@connect(
    state => ({}),
    {uploadAction}
)
class Upload extends Component {

    /**
     * 上传日记
     *
     * @param {FormData} formData 需要上传的日记数据，以FormData格式
     *  由FileUpload组件传回给container
     */
    upload(formData) {
        let {uploadAction} = this.props;
        debugger

        uploadAction(formData);
    }

    render() {
        return (
            <div className='comp-diary-upload'>
                <FileUpload upload={this.upload.bind(this)}/>
            </div>
        );
    }

}

export default Upload;
