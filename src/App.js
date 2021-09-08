import './App.css';
import 'antd/dist/antd.css';
import './index.css'

import React from 'react';
import RegisterForm from './component/RegisterForm/RegisterForm';
import NavigationBar from './component/Navbar/NavigationBar';
import AboutUs from './component/AboutUs/AboutUs';
import Articles from './component/Articles/Articles';
import ArticlePost from './component/Articles/ArticlePost';
import DiscussionList from './component/Discussion/DiscussionList';
import Home from './component/CovidAPI/Home';
import Footer from './component/Navbar/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogInForm from './component/RegisterForm/LogInForm';
import UpdateForm from './component/RegisterForm/UpdateForm';
import UpdateFormDoctors from './component/RegisterForm/UpdateFormDoctors';
import DiscussionForm from './component/Discussion/DiscussionForm';
import DiscussionPost from './component/Discussion/DiscussionPost';

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
          <Route exact path="/Discussion/new" component={DiscussionForm} />
          <Route exact path="/Discussion/:id" component={DiscussionPost} />
          <Route exact path="/Articles"><Articles /></Route>
          <Route exact path="/Article/:id" component={ArticlePost} />
          <Route exact path="/Login" component={LogInForm} />
          <Route exact path="/Register" component={RegisterForm} />
        </Switch>

        <br />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
