import React, { Component } from 'react';
import CovidAPI from './CovidAPI';

class Home extends Component {
    render() {
        return (
            <div>
                <div className="container" style={{minHeight: "800px"}}>
                    <CovidAPI />
                </div>
            </div>
        )
    }
}

export default Home