import React, { Component } from 'react';
import { rawMarkup } from './mixin/markup.jsx';

class Editor extends Component {

    constructor(props) { 
        super(props);

        this.state = {
            placeholder: 'write something?',
            text: '',
            preview: false
        }
    }

    render() {
        var prevState = this.state.preview;
        var displayText = prevState ? 'none' : 'block';
        var displayView = prevState ? 'block' : 'none';

        return (
            <div className='editor'>
                <textarea
                    placeholder={this.state.placeholder} 
                    defaultValue={this.state.text} 
                    ref='textarea'
                    style={{display: displayText}}
                />
                <div 
                    className='preview-view' 
                    ref='view' 
                    style={{display: displayView}} 
                    dangerouslySetInnerHTML={rawMarkup(this.state.text)}
                />
                <div 
                    className='btn' 
                    ref='preview' 
                    onClick={this.handleClick}>
                    {this.state.preview ? 'Back' : 'Preview'}
                </div>
            </div>
        );
    }

    handleClick() {
        var preView = this.refs.view;
        var textarea = this.refs.textarea;

        this.setState({
            text: textarea.value,
            preview: !this.state.preview
        });
    }
}

export default Editor;
