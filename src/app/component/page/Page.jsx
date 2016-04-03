import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {rawMarkup} from '../../mixin/markup';
import Util from '../../mixin/util'

import './page.scss';

/**
 * 正文页组件，用于展示文章内容
 *
 * @author YDSS
 */
class Page extends Component {

    /**
     * Datepicker的子元素，显示当前时间
     *  DatePicker组件必须传递children，用来显示输入框
     *
     * @param {Object} state datepicker的状态
     *  @property {GregorianCalendar} value 选中的日期
     *  @property {boolean} open datepicker是否被打开（显示calendar）
     *
     * @return {Object} jsx对象
     */
    createDateInput() {
        let {date} = this.state;

        return (
            <div 
                className='header-date' 
                style={{display: !!date ? 'block' : 'none'}}>
                <i className='fa fa-calendar'></i>
                <span>{date && moment(date, 'YYYY-MM-DD').format('D MMMM, YYYY')}</span>
            </div>
        );
    }

    render() {
        const {title, content, date, tags, children} = this.props;
        // const auth = this.props.auth.auth;

        // const calendar = (
        //     <Calendar
        //         showDateInput={false}
        //         disabledDate={disabledDate ? disabledDate : null}
        //         onSelect={onSelect ? onSelect : null}
        //         onChange={onChange ? onChange : null}
        //     />
        // );

        return (
            <div className="page">
                <article>
                    <h1>{title}</h1>
                    {!!DateInput &&
                        <div className='column'>
                            <DateInput date={date}/>
                        </div>
                    }
                    {/*
                    <div className="column">
                        <div 
                            style={{display: (auth ? 'block' : 'none')}}
                            className='header-btn-edit' 
                            onClick={this.edit.bind(this)}>
                            <i className='fa fa-edit'></i>
                            <span>EDIT</span>
                        </div>
                    </div>
                    */}
                    <div 
                        className="content"
                        dangerouslySetInnerHTML={rawMarkup(content)}></div>
                </article>
            </div>
        );
    }
   
}

Page.propTypes = {
    // 文章唯一标识，diary是dateString
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string,
    tags: PropTypes.array,
    disabledDate: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
};

export default Page;
