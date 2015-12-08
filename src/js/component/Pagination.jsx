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
     *  @param {number} articleSum 总页数
     *  @return {Array} 生成的页码序列
     */
    createPageNums(articleSum) {
        let pageNums = [];
        let { maxPage, pageSize } = this.props;
        // 总页数
        let pageSum = Math.ceil(articleSum / pageSize);
        if (pageSum > maxPage) {
            for (let i = 1; i < maxPage; i++) {
                pageNums.push(i);
            }
            pageNums.push('...', pageSum);
        }
        else {
            for (let i = 1; i < pageSum + 1; i++) {
                pageNums.push(i);
            }
        }

        return pageNums;
    }

    onPageClick(ev) {
        let $page = ev.currentTarget;
        let pageNum = +$page.textContent;

        let { curPage } = this.state;
        if (curPage === pageNum ) return;
        
        let { dispatch } = this.props;
        dispatch(paginate(pageNum)); 
    }

    /**
     * 生成页码的className
     *
     * @param {number|string} pageNum 页码
     */
    createPageClass(pageNum) {
        let { curPage } = this.state;
        // 如页码为... 则不可点
        let banItemText = '...';
        let pageClass = ['page'];
        
        banItemText === pageNum && pageClass.push(' ban');
        curPage === pageNum && pageClass.push(' current'); 

        return pageClass.join('');
    } 

    render() {
        let { articleSum } = this.props;
        if (typeof articleSum !== 'number' || articleSum < 1) {
            return null;
        }

        let { curPage } = this.state;
        let pageNums = this.createPageNums(articleSum);

        return (
            <ul className="pagination">
                <li
                    /*
                    * 当前页为第一页时，不显示跳转到首页按钮
                    */
                    style={{ display: (curPage === 1 ? 'none' : 'block') }}
                    className="first fa fa-angle-double-left" 
                    ref="first"></li>
                <li 
                    style={{ display: (curPage === 1 ? 'none' : 'block') }}
                    className="prev fa fa-angle-left" 
                    ref="prev"></li>
                {pageNums && pageNums.map(item => 
                    <li 
                        className={this.createPageClass(item)} 
                        key={item} 
                        onClick={/*去掉有...的btn*/item !== '...' && this.onPageClick.bind(this)}
                        >{item}</li>)}
                <li 
                    /*
                    * 当前页为最后一页时，不显示下一页按钮
                    */
                    style={{ display: (curPage === pageNums[pageNums.length - 1] ? 'none' : 'block') }}
                    className="next fa fa-angle-right" 
                    ref="next"></li>
                <li 
                    style={{ display: (curPage === pageNums[pageNums.length - 1] ? 'none' : 'block') }}
                    className="last fa fa-angle-double-right" 
                    ref="last"></li>
            </ul>
        );
    }
}

export default Pagination;
