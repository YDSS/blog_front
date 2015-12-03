import React, { Component } from 'react';
import { pushState } from 'redux-router';
import { rawMarkup } from '../mixin/markup.jsx';
import { addArticle } from '../action/articleAction';

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
        const prevState = this.state.preview;
        let displayText = prevState ? 'none' : 'block';
        let displayView = prevState ? 'block' : 'none';

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
                <div className='btns'>
                    <div 
                        className='btn' 
                        ref='preview' 
                        onClick={this.onPreviewClick.bind(this)}>
                        {this.state.preview ? 'Back' : 'Preview'}
                    </div>
                    <div
                        className='btn'
                        ref='submit'
                        onClick={this.onSubmit.bind(this)}>
                        submit
                    </div>
                </div>
            </div>
        );
    }

    onPreviewClick() {
        const refs = this.refs;
        let preView = refs.view;
        let textarea = refs.textarea;

        this.setState({
            text: textarea.value,
            preview: !this.state.preview
        });
    }

    onSubmit() {
        const { dispatch } = this.props;
        const refs = this.refs;
        let content = refs.textarea.value; 
        
        // add new article
        dispatch(addArticle(content));
        // route to home
        dispatch(pushState(null, '/home'));
    }
}

export default Editor;
