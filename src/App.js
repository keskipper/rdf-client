import React, { Component } from 'react';
import axios from 'axios';

import Icons from './helpers/icons';
import UserViewer from './components/user-viewer';
import GameSearch from './components/game-search';
import GameBuilder from './components/game-builder';
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
      user: {},
      createMode: false,
      gameToEdit: {},
      status: "status",
      showStatus: false
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.toggleUserProfile = this.toggleUserProfile.bind(this);
    this.toggleCreateMode = this.toggleCreateMode.bind(this);
    this.editGame = this.editGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.resetStatus = this.resetStatus.bind(this);
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
          this.setState({
            userExists: false,
            userProfileVisible: true
          })
        } else {
          //console.log("User id", response.data.id, "with email", this.state.email, "logged in.");          
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

  toggleUserProfile(){
    let newMode = !this.state.userProfileVisible;
    this.setState({ userProfileVisible: newMode });
  }

  toggleCreateMode(){
    let newMode = !this.state.createMode;
    this.setState({ createMode: newMode });
  }

  editGame(props){
    this.setState({ gameToEdit: props }, () => {
      this.toggleCreateMode();
    })
  }

  clearGame(){
    this.setState({ gameToEdit: {} })
  }

  setStatus(newStatus){
    this.setState({ status: newStatus, showStatus: true });
    setTimeout(() => this.resetStatus(), 7000);
  }

  resetStatus(){
    this.setState({ status: "", showStatus: false });
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
              toggleUserProfile={this.toggleUserProfile}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
          </div>
        )
      } else if (this.state.userExists && this.state.loggedInStatus === "LOGGED_IN" && !this.state.userProfileVisible) {
        return <div> 
          {this.state.createMode === false
          ? <GameSearch 
            toggleCreateMode={this.toggleCreateMode}            
            userLat={this.state.user.userLat}
            userLng={this.state.user.userLng}
            userId={this.state.user.id}
            editGame={this.editGame}
            status={this.state.status}
            setStatus={this.setStatus}
            showStatus={this.state.showStatus}
          />
          : <GameBuilder 
            userId={this.state.user.id}
            toggleCreateMode={this.toggleCreateMode}
            gameToEdit={this.state.gameToEdit}
            clearGame={this.clearGame}
            setStatus={this.setStatus}
          />
          }

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
          toggleUserProfile={this.toggleUserProfile}
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