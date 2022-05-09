import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

import SkateWings from '../static/skate-wings.png';

function Home(props) {

  const contentManager = () => {
    
    if(props.loggedInStatus === "NOT_LOGGED_IN"){
      
      return (
        <div className="home-info">
          <div className="welcome"><h1>Welcome</h1></div>
          <img alt="roller skate with wings" src={SkateWings} />
          <div><h2>to Roller Derby Finder!</h2></div>
          <div>To get started, log in with a Google account and then fill out your profile.</div>
        </div>
      )
    } else if (props.loggedInStatus === "LOGGED_IN" && props.userExists === false) {
      return (
        <div className="home-info">
          {/* #TODO redirect to user profile editor */}
        </div>
      )
    } else if (props.loggedInStatus === "LOGGED_IN" && props.userExists === true) {
      return (
        <div className="home-info">
          <div className="welcome"><h1>Welcome back!</h1></div>
          <img alt="roller skate with wings" src={SkateWings} />
          <div className="home-options">
            <h2>Let's play some derby.</h2>

            {props.showStatus
            ? <div className="status">{props.status}</div>
            : null}


            <div className="home-buttons">
              <Link to="search">
              <button type='button' className="btn btn-theme"><FontAwesomeIcon icon="fa-magnifying-glass" /> Search games</button>
              </Link>

              <Link to="create">
              <button type='button' className="btn btn-theme"><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> Create game</button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
  }
  
  return (
    <div className="home">
        {contentManager()}
    </div>
  )
}

export default Home