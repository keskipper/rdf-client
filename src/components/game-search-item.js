import React from 'react';
import moment from 'moment';
import helmet from '../static/helmet-icon.png';

function GameSearchItem(props) {

  function formatDate(datetime) {
    return moment(datetime).utc().format('MMMM DD YYYY, h:mm a');
  }

  
  return (
    <div className="game-search-item-wrapper">
        <div className="game-search-item">
            <div className="game-search-left">
              <img src={helmet}></img>
            </div>
            <div className="game-search-right">
              <div className="game-search-title">
                {props.game.title}
                <div className="game-search-subtitle">
                  Hosted by {props.game.hostingLeague} at {props.game.venueName} ({props.game.city}, {props.game.state} {props.game.zip})
                </div>
              </div>
              <div className="game-search-info">
                <div className="game-search-info-top">
                  {formatDate(props.game.date)}

                </div>
                  <div className="game-search-info-bottom">
                    {props.game.rosterOpen ?
                      <div className="open">Roster space open (gender: {props.game.gameGender})</div>
                      :
                      <div className="closed">Roster space closed</div>
                    }
                    <div className="distance-away">{(props.game.distance/1609).toFixed(1)} miles from you</div>
                    <br/>

                    {props.game.description}

                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default GameSearchItem