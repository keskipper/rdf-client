import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

import Login from './login';
import Logout from './logout';

import skate from '../static/skate-wings.png'

function Navigation(props) {

const navigationManager = () => {
    if(props.loggedInStatus === "LOGGED_IN" && props.userExists) {
        return (
            <Link to="/profile">
            <button className="btn btn-theme">
                <FontAwesomeIcon icon="fa-user" />&nbsp;
                {props.user.derbyName
                ? props.user.derbyName
                : props.user.firstName}
                </button>
            </Link>
            )
        } else if(props.loggedInStatus === "LOGGED_IN" && !props.userExists){
            return (
                <Link to="/edit">
                <button className="btn btn-theme">
                    <FontAwesomeIcon icon="fa-user" />&nbsp;
                        Profile
                    </button>
                </Link>
                )
        } else if(props.loggedInStatus === "NOT_LOGGED IN") {
            return null;
        }
    }


  return (
    <div className="navigation-wrapper">
        <div className="navigation-left">
            <div className="navigation-item">
                <Link to='/'>
                    <img src={skate} alt="rollerskate logo" />
                </Link>
            </div>
        </div>

        <div className="navigation-right">
            <div className="navigation-item">
                {navigationManager()}
            </div>

            <div className="navigation-item">
                {props.loggedInStatus === "NOT_LOGGED_IN"
                ? <Login 
                handleSuccessfulLogin={props.handleSuccessfulLogin}
                handleUnsuccessfulLogin={props.handleUnsuccessfulLogin}
                />
                : <Logout handleSuccessfulLogout={props.handleSuccessfulLogout}/>
                }
            </div>
        </div>          
    </div>
  )
}

export default Navigation