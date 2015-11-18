import React, {Component} from 'react';
import Sidebar from '../component/Sidebar.jsx';

class App extends Component {

    render() {
        return (
            <div className='app' id='app'>
                <Sidebar />
                {this.props.children}
            </div>
        );
    }
}

export default App;
