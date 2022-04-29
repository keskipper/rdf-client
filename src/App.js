import React, { Component } from 'react';
import axios from 'axios';

import Icons from './helpers/icons';
import UserViewer from './components/user-viewer';
import GameSearch from './components/game-search';
// import GameBuilder from './components/game-builder';
import Home from './components/home';
import Footer from './components/footer';

import './style/main.scss';
import Navigation from './components/navigation';


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

  handleSuccessfulLogin(email) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      email: email,
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
          {/* <GameBuilder /> */}
          <GameSearch 
            userLat={this.state.user.userLat}
            userLng={this.state.user.userLng}
          />
          </div>
      } else if (this.state.loggedInStatus === "NOT_LOGGED_IN") {
        return <Home />
      }
    }


    return (
      <div className="app-wrapper">
        <Navigation
          loggedInStatus={this.state.loggedInStatus}
          userProfileVisible={this.state.userProfileVisible}
          handleSuccessfulLogin={this.handleSuccessfulLogin}
          handleSuccessfulLogout={this.handleSuccessfulLogout}
          showUserProfile={this.showUserProfile}
          hideUserProfile={this.hideUserProfile}
        />

        <div className="home-wrapper">
          <div className="content">
            {contentManager()}
          </div>
        </div>

        <Footer />
    </div>
    );
  }
}