import React from 'react';
import { useNavigate } from 'react-router-dom';

import helmet from '../static/helmet-icon.png';

function GameSearchItem(props) {
  let navigate = useNavigate();

  function formatDate(datetime) {
    let date = new Date(datetime).toLocaleString('en-US', { timeZone: props.game.timezoneString });
    let temp = date.split(",");
    date = temp[0] + " at " + temp[1].substring(1, temp[1].lastIndexOf(":")) + temp[1].substring(temp[1].length-3, temp[1].length) + " (" + props.game.timezoneAbbr + ")";
    
    return date;
  }


  function handleClick(){
    navigate(`/games/${props.game.id}`);
  }

  
  return (
    <div className="game-search-item-wrapper" onClick={handleClick}>
        <div className="game-search-item">
            <div className="game-search-left">
              <div>
                <img alt="roller derby helmet icon" src={helmet}></img>
              </div>
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
                  {formatDate(props.game.date)}<br/>

                </div>
                  <div className="game-search-info-bottom">
                    {props.game.skaterRoster === "open" 
                      ? <div className="open">Roster space open to {props.game.adult} skaters (gender: {props.game.gameGender})</div>
                      : <div className="closed">Roster space closed for skaters</div> }

                    {props.game.officialRoster === "open" 
                      ? <div className="open">Roster space open to officials</div>
                      : <div className="closed">Roster space closed for officials</div> }
                      
                    {props.game.nsoRoster === "open" 
                      ? <div className="open">Roster space open to NSOs</div>
                      : <div className="closed">Roster space closed for NSOs</div> }

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