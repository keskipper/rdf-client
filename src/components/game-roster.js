import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameRoster(props) {
    const [ roster, setRoster ] = useState({
        players: []
    })


    function getRoster() {
        window.event.preventDefault();
        
        axios({
          method: "post",
          url: "http://localhost:8080/api/games/getGameRoster",
          data: {
            "id": props.id
          }
        }).then(response => {
          setRoster(prevRoster => ({
            ...prevRoster,
            players: response.data
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


  function displayRoster(){
      let list = roster.players.map(p => (
        <div className="roster-line" key={p.email}>
          <div className="one">{p.derbyName} #{p.jerseyNumber}</div><div className="two">{p.firstName} {p.lastName}</div><div className="three">{formatPhone(p.phone)}</div><div className="four">{p.email}</div>
        </div>
      ))
      return list;
  }


  return (
    <div className="game-roster-wrapper">
      <h1>Roster</h1>
        <div className="game-roster-container">  
          {roster.players.length === 0
          ? "No one's here yet!"
          : displayRoster()
          }         
            
        </div>
    </div>
  )
}

export default GameRoster