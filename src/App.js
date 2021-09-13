import './App.css';
import 'antd/dist/antd.css';
import './index.css'

import React from 'react';
import RegisterForm from './component/RegisterForm/RegisterForm';
import NavigationBar from './component/Navbar/NavigationBar';
import NavbarLogin from './component/Navbar/NavbarLogin';
import AboutUs from './component/AboutUs/AboutUs';
import Articles from './component/Articles/Articles';
import ArticlePost from './component/Articles/ArticlePost';
import DiscussionList from './component/Discussion/DiscussionList';
import Home from './component/CovidAPI/Home';
import Footer from './component/Navbar/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogInForm from './component/RegisterForm/LogInForm';
import UpdateForm from './component/RegisterForm/UpdateForm';
// import UpdateFormDoctors from './component/RegisterForm/UpdateFormDoctors';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/"><NavigationBar /><br/><Home /></Route>
          <Route exact path="/AboutUs"><NavigationBar /><AboutUs /></Route>
          <Route exact path="/Discussion"><NavigationBar /><br/><DiscussionList /></Route>
          <Route exact path="/Articles" ><NavigationBar /><br/><Articles /></Route>
          <Route exact path="/Article/:id" component={ArticlePost} />
          <Route exact path="/Login"><NavigationBar /><LogInForm  />< br/></Route>
          <Route exact path="/Register"><NavigationBar /><br/><RegisterForm/></Route>

          {/* <Route exact 
            path="/user"
            component={({ history }) => (
              <NavbarLogin history={history}/>
            )}
            ><br/><Home /></Route> */}
          <Route exact path="/user"><NavbarLogin/><br/><Home/></Route>
          <Route exact path="/user/AboutUs"><NavbarLogin/><br/><AboutUs /></Route>
          <Route exact path="/user/Discussion"><NavbarLogin/><br/><DiscussionList /></Route>
          <Route exact path="/user/Articles"><NavbarLogin/><br/><Articles /></Route>
          <Route exact path="/user/Article/:id" component={ArticlePost} />
          <Route exact path="/user/Profile"><NavbarLogin/><br/><UpdateForm/></Route>
        </Switch>

        <br />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
