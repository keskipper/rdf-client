import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';

import './App.css';

import Login from './components/login';
import Logout from './components/logout';
import Home from './components/home';

import User from './components/user';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      email: "",
      user: {}
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin(props) {
    //console.log("props: ", props);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      email: props
    }, () => {
      //check for user existing in db
      axios({
          method: 'post',
          url: "http://localhost:8080/api/users/email",
          data: {
            email: this.state.email
          }
        }
      ).then(response => {
        if(response.data.message === "NOTFOUND") {
          console.log("user not found");
          //TODO open user profile creation component
        } else {
          console.log("User id", response.data.id, "logged in.");
          //TODO open game search component
        }
        
      }).catch(error => {
        console.log("Error in App.js handleSuccessfulLogin(): ", error)
      })
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

      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user" element={<User/>} />
        </Routes>
      </Router>
    </div>
    );
  }
}