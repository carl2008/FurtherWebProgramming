import React, { Component } from 'react';
import CovidAPI from './CovidAPI';

class Home extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <CovidAPI />
                </div>
            </div>
        )
    }
}

export default Home