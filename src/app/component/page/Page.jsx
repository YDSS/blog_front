import React, {Component, PropTypes} from 'react';

import {rawMarkup} from '../../mixin/markup';
import Util from '../../mixin/util'

import './page.scss';

/**
 * 正文页组件，用于展示文章内容
 *
 * @author YDSS
 */
class Page extends Component {

    render() {
        const {title, content, tags, toolbar} = this.props;
        const {DateComponent, EditBtn} = toolbar;
        // const auth = this.props.auth.auth;
        
        return (
            <div className="page">
                <article>
                    <header>
                        <h1>{title}</h1>
                        <div className='toolbar'>
                            {!!DateComponent &&
                                <div className='column'>
                                    {DateComponent}
                                </div>
                            }
                            {!!EditBtn &&
                                <div className='column'>
                                    {EditBtn}
                                </div>
                            }
                        </div>
                    </header>
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
    content: PropTypes.string,
    tags: PropTypes.array,
    disabledDate: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    /**
     * Page的Toolbar里可以插入的组件
     */
    toolbar: PropTypes.shape({
        // 日期
        DateComponent: PropTypes.element.isRequired,
        // edit按钮
        EditBtn: PropTypes.element
    })
};

export default Page;
