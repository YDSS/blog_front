import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';

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

        let file = ev.dataTransfer.files[0];
        let formData = new FormData();
        formData.append('uploadFile', file);

        let dir = 'diary';
        fetch(`/file/upload?dir=${dir}`, {
            method: 'post',
            body: formData
        });
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

export default Upload;
