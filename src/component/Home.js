import React, { Component } from 'react';
import CovidAPI from './CovidAPI/CovidAPI';

class Home extends Component {
    render() {
        return (
            <div>
                <p>This is home page</p>
                <div className="container">
                    <CovidAPI />
                </div>
            </div>
        )
    }
}

export default Home