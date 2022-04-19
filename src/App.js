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

import UserEditor from './components/user-editor';
import GameFinder from './components/game-finder';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      email: "",
      userExists: false,
      userEditMode: false
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.showUserEditor = this.showUserEditor.bind(this);
    this.hideUserEditor = this.hideUserEditor.bind(this);
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
          //open user profile creation component
          this.setState({
            userExists: false
          })
        } else {
          console.log("User id", response.data.id, "logged in.");
          //open game search component
          this.setState({
            userExists: true
          })
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

  showUserEditor(){
    this.setState({
      userEditMode: true
    })
  }

  hideUserEditor(){
    this.setState({
      userEditMode: false
    })
  }


  render() {

    const contentManager = () => {
        if ((!this.state.userExists && this.state.loggedInStatus === "LOGGED_IN") || (this.state.userEditMode)) {
          return <UserEditor 
            showUserEditor={this.showUserEditor}
            hideUserEditor={this.hideUserEditor}
            />
        } else if (this.state.userExists && this.state.loggedInStatus === "LOGGED_IN" && !this.state.userEditMode) {
          return <GameFinder />
        }
    }


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

      {contentManager()}


      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user" element={<UserEditor/>} />
        </Routes>
      </Router>
    </div>
    );
  }
}