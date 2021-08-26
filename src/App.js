import './App.css';
import 'antd/dist/antd.css';
import './index.css'

import React from 'react';
import NavigationBar from './component/Navbar/NavigationBar';
import AboutUs from './component/AboutUs/AboutUs';
import Articles from './component/Articles/Articles';
import ArticlePost from './component/Articles/ArticlePost';
import DiscussionList from './component/Discussion/DiscussionList';
import Home from './component/CovidAPI/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <br />
        
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/AboutUs"><AboutUs /></Route>
          <Route exact path="/Discussion"><DiscussionList /></Route>
          <Route exact path="/Articles"><Articles /></Route>
          <Route exact path="/Article/:id" component={ArticlePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
