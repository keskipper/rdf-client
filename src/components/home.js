import React from 'react';
import SkateWings from '../static/skate-wings.png';

function home() {
  return (
    <div className="home">
      <div className="home-info">
        <div className="welcome"><h1>Welcome</h1></div>
        <img alt="roller skate with wings" src={SkateWings} />
        <div><h2>to Roller Derby Finder!</h2></div>
        <div>To get started, log in with a Google account and then fill out your profile.</div>
        
      </div>
    </div>
  )
}

export default home