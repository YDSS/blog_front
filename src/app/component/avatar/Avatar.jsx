import React, {Component, PropTypes} from 'react';

import './avatar.scss';

/**
 * 头像组件，stateless component
 *
 * @param {Object} props props属性
 * @author YDSS
 */
const Avatar = (props) => {
    const {name, avatarUrl} = props;

    return (
        <div className='avatar'>
            <img src={avatarUrl} alt={name}/>
            <p>{name}</p>
        </div>
    );   
}

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired
};

export default Avatar;
