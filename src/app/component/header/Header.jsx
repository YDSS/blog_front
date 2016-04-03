import React, {Component, PropTypes} from 'react';

import './header.scss';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMoveRight: false
        }
    }

    moveRight(ev) {
        let $wrap = document.getElementById('wrapper');
        let wrapClassList = $wrap.classList;
        let {hasMoveRight} = this.state;

        if (hasMoveRight) {
            wrapClassList.remove('move-right'); 
            this.setState({
                hasMoveRight: false
            });
        }
        else {
            wrapClassList.add('move-right');
            this.setState({
                hasMoveRight: true 
            });
        }
    }

    render() {
        let {avatarUrl} = this.props;
        avatarUrl = `url(${avatarUrl})`;

        return (
            <header className='header'>
                <div className='left'>
                    <i 
                        className='fa fa-bars' 
                        onClick={this.moveRight.bind(this)}></i>
                </div>
                <div className='right'>
                    <i 
                        style={{backgroundImage: avatarUrl}}
                        className='avatar-thumbnail'></i>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    avatarUrl: PropTypes.string.isRequired
};

export default Header;
