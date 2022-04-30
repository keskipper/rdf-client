import React, { useState } from 'react';
import axios from 'axios';

function GameBuilder(props) {
    const [ game, setGame ] = useState({
        title: "",
        description: "",
        gameLat: "",
        gameLng: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        venueName: "",
        date: "",
        time: "",
        organizer: "",
        hostingLeague: "",
        gameGender: "e",
        gameInDatabase: false
      })



      const buildBodyObject = () => {
        let bodyObj = "";
        let dateTime = game.date + " " + game.time;
  
        bodyObj = {
          "title": game.title,
          "description": game.description,
          "gameLat": "",
          "gameLng": "",
          "address1": game.address1,
          "address2": game.address2 || "",
          "city": game.city,
          "state": game.state,
          "zip": game.zip,
          "venueName": game.venueName,
          "date": dateTime,
          "organizer": props.userId,
          "hostingLeague": game.hostingLeague,
          "gameGender": game.gameGender || "e",
        }
  
        return bodyObj;
      }



      function handleSubmit(event){
        event.preventDefault();

        let verb = "";
        let url = "http://localhost:8080/api/games/";

        if(props.gameInDatabase){ 
          verb = "PUT";
          // url = `http://localhost:8080/api/games/${IDIDID}`;
        }
        if(!props.gameInDatabase){
          verb = "POST";
        }


        axios({
          method: verb,
          url,
          data: buildBodyObject()
        }
        ).then(response => {
          console.log("server response: ", response);
  
          if(response.status === 200) {
            setGame({
              title: "",
              description: "",
              gameLat: "",
              gameLng: "",
              address1: "",
              address2: "",
              city: "",
              state: "",
              zip: "",
              venueName: "",
              date: "",
              time: "",
              hostingLeague: "",
              gameGender: "e",
              gameInDatabase: true
            })
            props.toggleCreateMode();
          }
        }).catch(error => {
            console.log("error in game-builder handleSubmit(): ", error.response.data)
        });
      }



      function handleDelete(){

      }


  return (
    <div className="game-builder">
      <div className="game-builder-wrapper">

        <div className="form-wrapper">
          <div className="form-item">
            <h1>Create Game</h1>
          </div>

          <form id="game-edit-form">
            <div className="form-item">
            <label htmlFor="title">Title</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, title: event.target.value
                }))}} 
                type="text"
                name="title"
                placeholder="Game title (required)"
                maxLength={100}
                required
                value={game.title}/>
            </div>

            <div className="form-item">
            <label htmlFor="description">Description</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, description: event.target.value
                }))}} 
                type="textbox"
                name="description"
                placeholder="Game description (required)"
                maxLength={500}
                required
                value={game.description}/>  
            </div>

            <div className="form-item">
            <label htmlFor="hostingLeague">Hosting league</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, hostingLeague: event.target.value
                }))}} 
                type="textbox"
                name="hostingLeague"
                placeholder="Hosting league"
                maxLength={100}
                value={game.hostingLeague}/>  
            </div>

            <div className="form-item">
            <label htmlFor="gameGender">Gender</label><br/>
              <select 
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, gameGender: event.target.value
                }))}} 
                name="gameGender"
                required
                value={game.game} >
                  <option value="">Select one</option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="expansive">expansive</option>
              </select>
            </div>

            <div className="form-item">
              <label htmlFor="date">Date</label><br/>
              <input
                  onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, date: event.target.value
                  }))}} 
                  type="date"
                  name="date"
                  value={game.date}
              />
            </div>

            <div className="form-item">
              Time<br/>
              <input 
                  onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, time: event.target.value
                  }))}} 
                  type="time"
                  name="time"
                  value={game.time}
              />
            </div>

            <div className="form-item">
            <label htmlFor="venueName">Venue name</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, venueName: event.target.value
                }))}} 
                type="text"
                name="venueName"
                placeholder="Venue name"
                maxLength={100}
                value={game.venueName}/>
            </div>

            <div className="form-item">
            <label htmlFor="address1">Address 1</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, address1: event.target.value
                }))}} 
                type="text"
                name="address1"
                placeholder="Address 1"
                maxLength={45}
                required
                value={game.address1}/>
            </div>

            <div className="form-item">
            <label htmlFor="address1">Address 2</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, address2: event.target.value
                }))}} 
                type="text"
                name="address2"
                placeholder="Address 2"
                maxLength={45}
                value={game.address2}/>
            </div>

            <div className="form-item">
            <label htmlFor="city">City</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, city: event.target.value
                }))}} 
                type="text"
                name="city"
                placeholder="City"
                maxLength={45}
                required
                value={game.city}/>
            </div>

            <div className="form-item">
            <label htmlFor="state">State</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, state: event.target.value
                }))}} 
                type="text"
                name="state"
                placeholder="State"
                maxLength={2}
                required
                value={game.state}/>
            </div>

            <div className="form-item">
            <label htmlFor="zip">Zip</label><br/>
              <input 
                role="presentation"
                onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, zip: event.target.value
                }))}} 
                type="number"
                name="zip"
                placeholder="Zip code"
                maxLength={5}
                required
                value={game.zip}/>
            </div>
            

            <div className="form-item">
              <div className="button-row">
                <button onClick={handleSubmit} type='submit' className="btn btn-theme" form="game-edit-form">Save Game</button>
                <button onClick={props.toggleCreateMode} type='button' className="btn btn-theme">Cancel</button>
                {game.gameInDatabase
                ? <button onClick={handleDelete} type='submit' className="btn btn-delete">Delete Game</button>
                : <button type='button' className="btn btn-disabled">Delete Game</button>
                }
              </div>
              
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

export default GameBuilder