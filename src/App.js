import './App.css';
import React from 'react';
import Navbar from './component/Navbar/Navbar';
import AboutUs from './component/AboutUs';
import Articles from './component/Articles';
import Discussion from './component/Discussion';
import Home from './component/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/AboutUs"><AboutUs /></Route>
          <Route exact path="/Discussion"><Discussion /></Route>
          <Route exact path="/Articles"><Articles /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
