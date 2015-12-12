import React, { Component } from 'react';
import { dispatch } from 'redux';

/**
 * 翻页组件
 *
 * @props {number} maxPage 最多可以显示多少个页码
 * @props {number} pageSum 当前总页数
 * @props {Function} paginate 翻页函数
 * @props {number} curPage 当前页码
 */
class Pagination extends Component {

    /**
     * 生成页面序列，生成规则如下：
     *  如果总页数pageSum大于maxPage，则取前maxPage-1页 + ... + 最后一页
     *  若小余等于maxPage，则显示全部
     *
     *  @return {Array} 生成的页码序列
     */
    createPageNums() {
        let {maxPage, pageSum} = this.props;
        let pageNums = [];

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

        let {curPage, paginate} = this.props;
        if (curPage === pageNum ) return;
        
        paginate(pageNum);
    }

    /**
     * 生成页码的className
     *
     * @param {number|string} pageNum 页码
     */
    createPageClass(pageNum) {
        let { curPage } = this.props;
        // 如页码为... 则不可点
        let banItemText = '...';
        let pageClass = ['page'];
        
        banItemText === pageNum && pageClass.push(' ban');
        curPage === pageNum && pageClass.push(' current'); 

        return pageClass.join('');
    } 

    render() {
        let { curPage} = this.props;
        let pageNums = this.createPageNums();

        return (
            <ul className="pagination">
                <li
                    /*
                    * 当前页为第一页时，不显示跳转到首页按钮
                    */
                    style={{ display: (curPage === 1 ? 'none' : 'block') }}
                    className="first fa fa-angle-double-left" 
                    ref="first"
                    ></li>
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
