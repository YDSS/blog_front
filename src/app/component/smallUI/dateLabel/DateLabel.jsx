import React, {PropTypes} from 'react';
import moment from 'moment';

import './dateLabel.scss';

/**
 * 日期组件，只展示时间，stateless component
 *
 * @author YDSS
 */
const DateLabel = (props) => {
    const {date} = props;
    let hasDate = !!date;
    let formatDate = hasDate 
        ? moment(date).format('DD MMMM, YYYY')
        : '';

    return (
        <div 
            className='date-label'
            style={{display: (hasDate ? 'block' : 'none')}}>
            <i className='fa fa-calendar'></i>
            <span>{formatDate}</span>
        </div>
    );
}

DateLabel.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ])
};

export default DateLabel;

