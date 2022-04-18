import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import './App.css';

import Login from './components/login';
import Logout from './components/logout';
import Locator from './components/locator';

import User from './components/user';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  render() {
    return (
      <div className="App">


      {this.state.loggedInStatus === "NOT_LOGGED_IN" ?
        <Login 
          handleSuccessfulLogin={this.handleSuccessfulLogin}
          handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
        />
        :
        <Logout handleSuccessfulLogout={this.handleSuccessfulLogout}/>
      }

      <Locator />
<Router>
        <Routes>
          <Route path="/user" element={<User/>} />
        </Routes>
        </Router>
    </div>
    );
  }
}