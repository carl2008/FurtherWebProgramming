import './App.css';
import 'antd/dist/antd.css';
import './index.css'

import React from 'react';
import RegisterForm from './component/RegisterForm/RegisterForm';
import Navbar from './component/Navbar/Navbar';
import AboutUs from './component/AboutUs/AboutUs';
import Articles from './component/Articles/Articles';
import ArticlePost from './component/Articles/ArticlePost';
import DiscussionList from './component/Discussion/DiscussionList';
import Home from './component/CovidAPI/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogInForm from './component/RegisterForm/LogInForm';
import UpdateForm from './component/RegisterForm/UpdateForm';
import UpdateFormDoctors from './component/RegisterForm/UpdateFormDoctors';

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
          <Route exact path="/Register" component={RegisterForm}/>
        </Switch>
      </Router>
<LogInForm/>
<UpdateForm/>
<UpdateFormDoctors/>

    </div>
  );
}

export default App;
