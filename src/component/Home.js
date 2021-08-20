import React, { Component } from 'react';
import CovidAPI from './CovidAPI/CovidAPI';

class Home extends Component {
    render() {
        return (
            <div class="container">
                <p>This is home page</p>
                <CovidAPI />
            </div>
        )
    }
}

export default Home