import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../component/Sidebar.jsx';
import Content from '../component/Content.jsx';

class App extends Component {

    render() {
        const { navItem, articleList } = this.props;

        return (
            <div className='app' id='app'>
                <Sidebar navItem={navItem} />
                <Content list={articleList} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        navItem: state.navItem,
        articleList: state.articleList
    }
}


export default connect(
    mapStateToProps
)(App);
