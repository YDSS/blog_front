import React, { Component } from 'react';
import { getAllArticle } from '../action/articleAction';
import ListItem from './ListItem.jsx';

class Content extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getAllArticle());
    }

    render() { 
        const { articles } = this.props;
        // let articles = (this.state && this.state.articles) || []; 

        return (
            <div className='content'>
                {articles && articles.map(item => 
                    <ListItem data={item} key={item.id} />
                )}
            </div>
        );
    }
}

export default Content;
