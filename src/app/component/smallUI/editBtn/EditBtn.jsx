import React, {PropTypes} from 'react';

import './editBtn.scss';

const EditBtn = (props) => {
    const {link} = props;

    return (
        <div 
            className='edit-btn' 
            onClick={link}>
            <i className='fa fa-edit'></i>
            <span>EDIT</span>
        </div>
    );
}

EditBtn.propTypes = {
    link: PropTypes.func.isRequired
};

export default EditBtn;
