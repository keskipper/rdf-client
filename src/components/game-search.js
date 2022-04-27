import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

import GameSearchItem from './game-search-item';
import ReverseGeocoder from './reverse-geocoder';

function GameSearch(props) {
  const [ games, setGames ] = useState({
    gameItems: [],
    miles: 50,
    totalCount: 0,
    currentPage: 0,
    isLoading: true
  })


  // useEffect(() => {
  //   const listener = event => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       //console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       getGames();
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);


  function getGames(event) {
    event.preventDefault();
    // setGames(prevGames => ({
    //   ...prevGames,
    //   currentPage: prevGames.currentPage + 1
    // }));
    axios({
      method: "post",
      url: "http://localhost:8080/api/games/limitbydistance",
      data: {
        "miles": games.miles,
        "userLat": props.userLat,
        "userLng": props.userLng
      }
    }).then(response => {
      //console.log(response.data);
      setGames(prevGames => ({
        ...prevGames,
        gameItems: response.data
      }))
    }).catch(error => {
      console.log("error in getGames(): ", error.response.data)
    });
  }


  const searchResults = () => {
    return(
      <div className="search-results">
        <div className="search-results-top">
          <div className="search-results-top-left">
            {games.gameItems.length} games found!
          </div>
          <div className="search-results-top-right">
            <button className="btn btn-theme" type='button'>Sort by date</button>
          </div>
          
        </div>
        

          {games.gameItems.map(g => (
            <GameSearchItem
              key={g.id}
              game={g}
            />
          ))} 
      </div>
    )
  }


  return (
    <div className="game-search-wrapper">
      <div className="form-wrapper">
        <div className="game-search-header">

          <h1>Find games!</h1>
          <form id="game-search">
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
              <ReverseGeocoder lat={props.userLat} lng={props.userLng} />

            <div className="search-form-button">

              <div className="form-item">
                <button className="btn btn-theme" type="submit" onClick={getGames}><FontAwesomeIcon icon="fa-magnifying-glass" /> Search</button>
              </div>
            </div>

          
            {/* <div className="searchBar">
              <label htmlFor=''>Search <FontAwesomeIcon icon="fa-magnifying-glass" /></label><br/>
              <input
                type="text"
                placeholder='Find games!'
                name="searchBar"
              />
            </div> */}
          </form>
      </div>


      <h2>Search results</h2>
      <div className="search-results">
          
          {games.gameItems.length > 0 ?
            searchResults()
            : null
          }


        </div>
      </div>
    </div>
  )
}

export default GameSearch