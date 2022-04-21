import React, { Component } from 'react';
import axios from 'axios';

import './style/main.scss';

import Login from './components/login';
import Logout from './components/logout';

import UserViewer from './components/user-viewer';
import GameFinder from './components/game-finder';


export default class App extends Component {
  constructor(props) {
    super(props);

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
            userExists: false,
            userProfileVisible: true
          })
        } else {
          console.log("User id", response.data.id, "logged in.");
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
      loggedInStatus: "NOT_LOGGED_IN"
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
              email={this.props.email}
              userExists={this.state.userExists}
              user={this.state.user}
              showUserProfile={this.showUserProfile}
              hideUserProfile={this.hideUserProfile}
            />
          </div>
        )
      } else if (this.state.userExists && this.state.loggedInStatus === "LOGGED_IN" && !this.state.userProfileVisible) {
        return <GameFinder />
      }
    }

    const navigationManager = () => {
      if(this.state.loggedInStatus === "LOGGED_IN" && this.state.userProfileVisible === false) {
        return <button onClick={this.showUserProfile}>Show User Profile</button>
      } else if(this.state.loggedInStatus === "LOGGED_IN" && this.state.userProfileVisible === true){
        return <button onClick={this.hideUserProfile}>Hide User Profile</button>
      } else if(this.state.loggedInStatus === "NOT_LOGGED IN") {
        return null;
      }
    }


    return (
      <div className="app-wrapper">
        <div className="navigation-wrapper">
          <div className="navigation-left">
            <div className="navigation-item">
              <button>Logo</button>
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