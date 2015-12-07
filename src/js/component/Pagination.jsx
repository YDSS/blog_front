import React, { Component } from 'react';
import { dispatch } from 'redux';
import { paginate } from '../action/articleAction';

class Pagination extends Component {

    constructor(props) {
        super(props);

        this.state = {
            curPage: 1
        };
    }

    /**
     * 生成页面序列，生成规则如下：
     *  如果总页数大于maxPage，则取前maxPage-1页 + ... + 最后一页
     *  若小余等于maxPage，则显示全部
     *
     *  @param {number} pageSum 总页数
     *  @return {Array} 生成的页码序列
     */
    createPages(pageSum) {
        let pages = [];
        let { maxPage } = this.props;
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

    onPageClick(ev) {
        debugger
        let { dispatch } = this.props;
        let $page = ev.currentTarget;
        let pageNum = +$page.textContent;

        dispatch(paginate(pageNum)); 
    }

    render() {
        let { pageSum } = this.props;
        if (typeof pageSum !== 'number' || pageSum < 1) {
            return null;
        }

        let pages = this.createPages(pageSum);

        return (
            <ul className="pagination">
                <li className="first fa fa-angle-double-left" ref="first"></li>
                <li className="prev fa fa-angle-left" ref="prev"></li>
                {pages && pages.map(item => 
                    <li className="page" key={item} onClick={/*去掉有...的btn*/item !== '...' && this.onPageClick.bind(this)}>{item}</li>)}
                <li className="next fa fa-angle-right" ref="next"></li>
                <li className="last fa fa-angle-double-right" ref="last"></li>
            </ul>
        );
    }
}

export default Pagination;
