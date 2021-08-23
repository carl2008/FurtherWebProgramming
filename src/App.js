import './App.css';
import 'antd/dist/antd.css';
import './index.css'

import React from 'react';
import Navbar from './component/Navbar/Navbar';
import AboutUs from './component/AboutUs';
import Articles from './component/Articles';
import ArticlePost from './component/ArticlePost';
import DiscussionList from './component/DiscussionList';
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
          <Route exact path="/Discussion"><DiscussionList /></Route>
          <Route exact path="/Articles"><Articles /></Route>
          <Route exact path="/Article/:id" component={ArticlePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
