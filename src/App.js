import React, { Component } from 'react';
import axios from 'axios';
import { Routes, Route, Outlet } from "react-router-dom";

import Icons from './helpers/icons';
import UserViewer from './components/user-viewer';
import GameSearch from './components/game-search';
import GameBuilder from './components/game-builder';
import Home from './components/home';
import Footer from './components/footer';
import Error404 from './components/error-404';
import Game from './components/game';
import UserEditor from './components/user-editor';
import { withRouter } from './helpers/withRouter';

import './style/main.scss';
import Navigation from './components/navigation';


class App extends Component {
  constructor(props) {
    super(props);    

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      email: "",
      userExists: false,
      user: {},
      gameToEdit: {},
      status: "status",
      showStatus: false,
      searchResults: []
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.editGame = this.editGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.resetStatus = this.resetStatus.bind(this);  
    this.setUser = this.setUser.bind(this);  
  }


  handleSuccessfulLogin(email) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      email: email,
    }, () => {
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
            userExists: false
          }, () => {
            this.props.navigate("/edit");
          })
        } else {
          this.setState({
            userExists: true,
            user: response.data
          });
          this.props.navigate("/");
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
      user: {}
    });
    this.props.navigate("/");
  }

  editGame(props){
    this.setState({ gameToEdit: props })
  }

  clearGame(){
    this.setState({ gameToEdit: {} })
  }

  setStatus(newStatus){
    this.setState({ status: newStatus, showStatus: true });
    setTimeout(() => this.resetStatus(), 5000);
  }

  resetStatus(){
    this.setState({ status: "", showStatus: false });
  }
  
  setUser(newUser){
    this.setStatus({ user: newUser })
  }

  render() {

    return (
      <div className="app-wrapper">

        <Navigation
          loggedInStatus={this.state.loggedInStatus}
          handleSuccessfulLogin={this.handleSuccessfulLogin}
          handleSuccessfulLogout={this.handleSuccessfulLogout}
          user={this.state.user}
        />


        <div className="content-wrapper">
          <div className="content">

            <Routes>
              <Route index element={
                <Home 
                  loggedInStatus={this.state.loggedInStatus} 
                  userExists={this.state.userExists}
                  status={this.state.status}
                  showStatus={this.state.showStatus}
                />
              } />

              <Route path="search" element={
                <GameSearch 
                  userLat={this.state.user.userLat}
                  userLng={this.state.user.userLng}
                  userId={this.state.user.id}
                  editGame={this.editGame}
                  status={this.state.status}
                  setStatus={this.setStatus}
                />
                }
              />
              <Route path="games/:gameId" element={
                <Game 
                  userId={this.state.user.id}
                  editGame={this.editGame}
                />
                } 
              />
              <Route path="create" element={
                <GameBuilder 
                  userId={this.state.user.id}
                  gameToEdit={this.state.gameToEdit}
                  clearGame={this.clearGame}
                  setStatus={this.setStatus}
                />
                } 
              />              
              <Route path="profile" element={
                <UserViewer
                  email={this.state.email}
                  userExists={this.state.userExists}
                  user={this.state.user}
                  editGame={this.editGame}
                />
                }
              />
              <Route path="edit" element={
                <UserEditor 
                  email={this.state.email}
                  userExists={this.state.userExists}
                  user={this.state.user}
                  setUser={this.setUser}
                  />
                  }
              />
              <Route path="*" element={<Error404 />} />
            </Routes>

              <Outlet />
            
          </div>
        </div>

        <Footer />

    </div>
    );
  }
}

export default withRouter(App);