import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GameRoster(props) {
    const [ roster, setRoster ] = useState({
        roster: [],
        status: "",
        showStatus: false
    })


    function getRoster() {
        window.event.preventDefault();
        
        axios({
          method: "POST",
          url: "http://localhost:8080/api/games/getGameRoster",
          data: {
            "id": props.id,
            "joinType": props.joinType
          }
        }).then(response => {
          setRoster(prevRoster => ({
            ...prevRoster,
            roster: response.data
          }))
        }).catch(error => {
          console.log("error in getRoster(): ", error.response.data)
        });
      }



  useEffect(() => {
      getRoster();
  }, [])


  function formatPhone(phone){
    let formatted = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, 10);
    return formatted;
  }


  function formatTitle(title){
    if(title === "official") return "Official"
    if(title === "player") return "Player"
    if(title === "nso") return "NSO"
  }


  function displayRoster(){
      let list = roster.roster.map(p => (
        <div className="roster-line" key={p.email}>
          <div className="one">{p.derbyName} #{p.jerseyNumber}</div>
          <div className="two">{p.firstName} {p.lastName}</div>
          <div className="three">{formatPhone(p.phone)}</div>
          <div className="four">{p.email}</div>
          <div className="delete" onClick={() => {deleteFromRoster(p.joinId)}} ><FontAwesomeIcon icon="fa-trash" /></div>
        </div>
      ))
      return list;
  }


  function deleteFromRoster(joinId){
    window.event.preventDefault();

    axios({
      method: "DELETE",
      url: `http://localhost:8080/api/jct_users_games/${joinId}`
    }).then(response => {
      flashStatus("Deleted from roster");
      getRoster();
    }).catch(error => {
      console.log("error in getRoster(): ", error.response.data)
    });

  }


  function flashStatus(newStatus){
    setRoster(prevRoster => ({
      ...prevRoster,
      status: newStatus,
      showStatus: true
    }))
    setTimeout(() => resetStatus(), 4000);
  }

  function resetStatus(){
    setRoster(prevRoster => ({
      ...prevRoster,
      status: "",
      showStatus: false
    }))
  }


  return (
    <div className="game-roster-wrapper">
      <h1>{formatTitle(props.joinType)} Roster</h1>
        {roster.showStatus
        ? <div className="status">{roster.status}</div>
        : null }

        <div className="game-roster-container">  
          {roster.roster.length === 0
          ? "No one's here yet!"
          : displayRoster() }         
        </div>
    </div>
  )
}

export default GameRoster