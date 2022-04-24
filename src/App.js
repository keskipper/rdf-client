import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Login from './components/login';
import Logout from './components/logout';
import Icons from './helpers/icons';
import UserViewer from './components/user-viewer';
import GameFinder from './components/game-finder';
import GameBuilder from './components/game-builder';
import Home from './components/home';

import './style/main.scss';
import skate from './static/skate.webp';


export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      email: "",
      userExists: false,
      userProfileVisible: false,
      user: {}
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
    this.hideUserProfile = this.hideUserProfile.bind(this);
  }

  handleSuccessfulLogin(props) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      email: props
    }, () => {//check for user existing in db
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
            userExists: false,
            userProfileVisible: true
          })
        } else {
          console.log("User id", response.data.id, "with email", this.state.email, "logged in.");
          //open game search component
          this.setState({
            userExists: true,
            user: response.data
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
      loggedInStatus: "NOT_LOGGED_IN",
      userProfileVisible: false,
      user: {}
    })
  }

  showUserProfile(){
    this.setState({ userProfileVisible: true })
  }

  hideUserProfile(){
    this.setState({ userProfileVisible: false })
  }


  render() {

    const contentManager = () => {      

      if ((!this.state.userExists && this.state.loggedInStatus === "LOGGED_IN") || (this.state.userProfileVisible)) {
        return (
          <div>
            <UserViewer
              email={this.state.email}
              userExists={this.state.userExists}
              user={this.state.user}
              showUserProfile={this.showUserProfile}
              hideUserProfile={this.hideUserProfile}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
          </div>
        )
      } else if (this.state.userExists && this.state.loggedInStatus === "LOGGED_IN" && !this.state.userProfileVisible) {
        return <div> 
          <GameBuilder />
          <GameFinder />
          </div>
      } else if (this.state.loggedInStatus === "NOT_LOGGED_IN") {
        return <Home />
      }
    }

    const navigationManager = () => {
      if(this.state.loggedInStatus === "LOGGED_IN" && this.state.userProfileVisible === false) {
        return <button className="btn btn-theme" onClick={this.showUserProfile}><FontAwesomeIcon icon="fa-user" /> Profile</button>
      } else if(this.state.loggedInStatus === "LOGGED_IN" && this.state.userProfileVisible === true){
        return <button className="btn btn-theme" onClick={this.hideUserProfile}>Hide Profile</button>
      } else if(this.state.loggedInStatus === "NOT_LOGGED IN") {
        return null;
      }
    }


    return (
      <div className="app-wrapper">
        <div className="navigation-wrapper">
          <div className="navigation-left">
            <div className="navigation-item">
              <img src={skate} alt="rollerskate logo" />
              </div>
          </div>

          <div className="navigation-right">
            <div className="navigation-item">
                {navigationManager()}
            </div>

            <div className="navigation-item">
              {this.state.loggedInStatus === "NOT_LOGGED_IN" ?
              <Login 
                handleSuccessfulLogin={this.handleSuccessfulLogin}
                handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
              />
              :
              <Logout handleSuccessfulLogout={this.handleSuccessfulLogout}/>
              }
            </div>
          </div>          
        </div>

        <div className="home-wrapper">
          <div className="content">
            {contentManager()}
          </div>
        </div>
      



    </div>
    );
  }
}