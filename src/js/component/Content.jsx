import React, { Component } from 'react';
import { fetchAllArticle } from '../action/articleAction';
import ListItem from './ListItem.jsx';

class Content extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchAllArticle());
    }

    render() { 
        const { articleList } = this.state;

        return (
            <div className='content'>
                {articleList.map(item => 
                    <ListItem data={item} key={item.id} />
                )}
            </div>
        );
    }
}

export default Content;
