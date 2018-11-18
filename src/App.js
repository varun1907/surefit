import React, { Component } from 'react';
import './App.css';
import * as ml5 from "ml5";
import PrimarySearchAppBar from './components/top-bar';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Cameras from './components/Camera.js';
import Root from './components/Root.js';
import TextInput from './components/TextInput'
import SigninRoot from './components/Signin/SigninRoot';
import SignupRoot from './components/SignUp/SignupRoot';


class App extends Component {

  render() {

    return (
      <Router>

        <div>
          <Route exact path="/" component={Root} />
          <Route exact path="/camera" component={Cameras} />
          <Route exact path="/text" component={TextInput} />
          <Route exact path="/login" component={SigninRoot} />
          <Route exact path="/register" component={SignupRoot} />

        </div>

      </Router>
    );
  }
}

export default App;
