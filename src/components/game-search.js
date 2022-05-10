import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from 'react-router-dom';

import GameSearchItem from './game-search-item';
import ReverseGeocoder from './reverse-geocoder';

function GameSearch(props) {
  const [ games, setGames ] = useState({
    gameItems: [],
    adult: "adult",
    miles: 50,
    orderBy: "date",
    rendered: 0
  })


  function getGames(event) {
    event.preventDefault();
    
    axios({
      method: "post",
      url: "http://localhost:8080/api/games/limitbydistance",
      data: {
        "adult": games.adult,
        "miles": games.miles,
        "userLat": props.userLat,
        "userLng": props.userLng,
        "orderField": games.orderBy
      }
    }).then(response => {
      setGames(prevGames => ({
        ...prevGames,
        gameItems: response.data
      }))
    }).catch(error => {
      console.log("error in getGames(): ", error.response.data)
    });
  }


  function changeSort(){
    let sortBy;
    if(games.orderBy === "date"){
      sortBy = "distance"
    } else {
      sortBy = "date"
    }
    setGames(prevGames => ({
      ...prevGames,
      orderBy: sortBy
    }))
  }


  useEffect(() => {
    if(games.rendered >= 1) {
      getGames(window.event);
    }
    setGames(prevGames => ({
      ...prevGames,
      rendered: prevGames.rendered + 1
    }))
  }, [games.orderBy])


  const searchResults = () => {
    return(
      <div className="search-results">
        <div className="search-results-top">
          <div className="search-results-top-left">
            {games.gameItems.length} games found!
          </div>
          <div className="search-results-top-right">
            {games.orderBy === "date"
            ? <button className="btn btn-theme" type='button' onClick={changeSort}>Sort by distance</button>
            : <button className="btn btn-theme" type='button' onClick={changeSort}>Sort by date</button>
            }
          </div>
        </div>

          {games.gameItems.map(g => (
            <GameSearchItem
              key={g.id}
              game={g}
              userId={props.userId}
              editGame={props.editGame}
            />
          ))} 
      </div>
    )
  }


  return (
    <div className="universal-wrapper">
    <div className="game-search">
      <div className="game-search-wrapper">
        <div className="form-wrapper">
          <div className="game-search-header">

            <h1>Find games!</h1>
            <form id="game-search">
              <div className="search-line">
                for &nbsp;
                <select 
                    onChange={(event) => {setGames(prevGames => ({
                      ...prevGames, adult: event.target.value
                    }))}} 
                    name="adult"
                    value={games.adult} >
                      <option value="adult">adult</option>
                      <option value="junior">junior</option>
                  </select>
                &nbsp;skaters
              </div>

              <div className="search-line">
                within&nbsp;
                <input
                  onChange={(event) => {setGames(prevGames => ({
                    ...prevGames, miles: event.target.value
                  }))}} 
                  type="text"
                  maxLength={3}
                  name="miles"
                  value={games.miles}
                />
                &nbsp;miles of my location
              </div>

              <div className="location">
                <ReverseGeocoder lat={props.userLat} lng={props.userLng} />
              </div>
                
              <div className="search-form-button">

                <div className="form-item">
                  <button className="btn btn-theme" type="submit" onClick={getGames}><FontAwesomeIcon icon="fa-magnifying-glass" /> Search</button>
                </div>
              </div>

              <div className="new-game-btn">
                <Link to="/create">
                <button className="btn btn-theme" type='button'><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> Create new game</button>
                </Link>
              </div>
            </form>
        </div>


        <h2>Search results</h2>
        <div className="status" style={{ display: props.showStatus? "block" : "none" }}>{props.status}</div>
        <div className="search-results">          
            {games.gameItems.length > 0 
              ? searchResults()
              : "No results! Either you haven't searched yet, or there aren't any games near you."
            }

          </div>
        </div>
      </div>  
    </div>
    </div>
  )
}

export default GameSearch