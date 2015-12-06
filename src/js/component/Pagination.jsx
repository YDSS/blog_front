import React, { Component } from 'react';
import { dispatch } from 'redux';

class Pagination extends Component {

    constructor(props) {
        super(props);

        this.state = {
            curPage: 1,
            maxPage: 7
        };
    }

    createPages(pageSum) {
        let pages = [];
        let maxPage = this.state.maxPage;
        // 如果总页数大于maxPage，则取前maxPage-1页 + ... + 最后一页
        if (pageSum > maxPage) {
            for (let i = 1; i < maxPage; i++) {
                pages.push(i);
            }
            pages.push('...', pageSum);
        }
        else {
            for (let i = 1; i < pageSum; i++) {
                page.push(i);
            }
        }

        return pages;
    }

    render() {
        let { article: {pageSum} } = this.props;
        let pages = createPages(pageSum);

        return (
            <ul className="pagination">
                <li className="first" ref="first">&lt;&lt;</li>
                <li className="prev" ref="prev">&lt;</li>
                {pages.map(item => 
                   <li className="page" key={item} onClick={this.onPageClick.bind(this)}>item</li>)}
                <li className="next" ref="next">&gt;</li>
                <li className="last" ref="last">&gt;&gt;</li>
            </ul>
        );
    }
}

export default Pagination;
