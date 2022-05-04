import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LocationSearch from './location-search';
import convertRegion from '../helpers/convert-region';


function GameBuilder(props) {
    const [ game, setGame ] = useState({
        id: "",
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
        organizer: props.userId,
        hostingLeague: "",
        timezoneOffset: "",
        timezoneAbbr: "",
        timezoneString: "",
        gameGender: "expansive",
        gameInDatabase: false,
        currentGame: props.gameToEdit,
        errorText: ""
      })



      function formatISODate(localeString){        
        const splitDate = localeString.split("/");
        let day = splitDate[0];
        if(day.length < 2){ day = "0" + day }
        let month = splitDate[1];
        if(month.length < 2){ month = "0" + month }
        let year = splitDate[2].substring(0,4);
        return year + "-" + month + "-" +day;
      }


      function formatISOTime(localeString){
        const splitTime = localeString.split(", ");
        let time = splitTime[1];
        let ampm = splitTime[1].substring(splitTime[1].length-2, splitTime[1].length);

        if(time.length < 11){ time = "0" + time }
        time = time.substring(0, 5);

        if(ampm === "PM"){
          let afternoonTime = Number(time.substring(0,2)) + 12;
          afternoonTime = afternoonTime + time.substring(2, 5);          
          return afternoonTime;
        }
        else { return time; }
      }



      useEffect(() => {
        if(game.currentGame.id) {
          const dateTime = new Date(game.currentGame.date).toLocaleString('en-US', { timeZone: game.currentGame.timezoneString });
          let date = formatISODate(dateTime);
          let time = formatISOTime(dateTime);

          setGame(prevGame => ({
            ...prevGame,
            id: game.currentGame.id,
            title: game.currentGame.title,
            description: game.currentGame.description,
            gameLat: game.currentGame.gameLat,
            gameLng: game.currentGame.gameLng,
            address1: game.currentGame.address1,
            address2: game.currentGame.address2,
            city: game.currentGame.city,
            state: game.currentGame.state,
            zip: game.currentGame.zip,
            venueName: game.currentGame.venueName,
            date: date,
            time: time,
            hostingLeague: game.currentGame.hostingLeague,
            gameGender: game.currentGame.gameGender,
            timezoneOffset: game.currentGame.timezoneOffset,
            timezoneAbbr: game.currentGame.timezoneAbbr,
            timezoneString: game.currentGame.timezoneString,
            gameInDatabase: true
          }))   
        }
      },[]);


      const buildBodyObject = () => {
        let bodyObj = "";
        let time = game.date + "T" + game.time;

        let state;
        if(game.state.length > 2){state = convertRegion(game.state, "TO_ABBREVIATED");}
        
        let gameLat = Number(game.gameLat).toFixed(4);
        let gameLng = Number(game.gameLng).toFixed(4);
  
        bodyObj = {
          "title": game.title,
          "description": game.description,
          "gameLat": gameLat,
          "gameLng": gameLng,
          "address1": game.address1 || "",
          "address2": game.address2 || "",
          "city": game.city || "",
          "state": state || "",
          "zip": game.zip || "",
          "venueName": game.venueName,
          "organizer": props.userId,
          "hostingLeague": game.hostingLeague,
          "gameGender": game.gameGender || "expansive",
          "timezoneOffset": game.timezoneOffset,
          "timezoneAbbr": game.timezoneAbbr,
          "timezoneString": game.timezoneString
        }
        return bodyObj;
      }


      function handleSubmit(event){
        event.preventDefault();

        let verb = "";
        let url = "http://localhost:8080/api/games/";

        if(game.gameInDatabase){ 
          verb = "PUT";
          url = `http://localhost:8080/api/games/${game.id}`;
        }
        if(!game.gameInDatabase){
          verb = "POST";
        }

        axios({
          method: verb,
          url,
          data: buildBodyObject()
        }
        ).then(response => {
  
          if(response.status === 200) {
            setGame({
              id: "",
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
              timezoneOffset: "",
              timezoneAbbr: "",
              timezoneString: "",
              gameInDatabase: true
            })
            props.clearGame();
            props.toggleCreateMode();
          }
        }).catch(error => {
            console.log("error in game-builder handleSubmit(): ", error.response.data)
            setGame(prevGame => ({
              ...prevGame,
              errorText: error.response.data.message
            }))
        });
      }


      function passPlace(place){
        let address1 = place.address.house_number || "";
        if(address1.length > 0){address1 += " "}
        address1 += place.address.road;

        setGame(prevGame => ({
          ...prevGame,
          venueName: place.address.name,
          address1: address1 || "",
          address2: "",
          city: place.address.city || "",
          state: place.address.state || "",
          zip: place.address.postcode || "",
          gameLat: place.lat,
          gameLng: place.lon
        }))
      }


      function passTimezone(timezone){
        setGame(prevGame => ({
          ...prevGame,
          timezoneOffset: timezone.offset_sec/3600,
          timezoneAbbr: timezone.short_name,
          timezoneString: timezone.name
        }))
        console.log("timezone:", timezone);
      }


      function handleCancel(){
        props.clearGame();
        props.toggleCreateMode();
      }


      function handleDelete(){

      }


  return (
    <div className="game-builder">
      <div className="game-builder-wrapper">

        <div className="form-wrapper">
          <div className="form-item">
            <h1>Create/Edit Game</h1>
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
                value={game.gameGender} >
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
              Time ({game.timezoneAbbr})<br/>
              <input 
                  onChange={(event) => {setGame(prevGame => ({
                  ...prevGame, time: event.target.value
                  }))}} 
                  type="time"
                  name="time"
                  value={game.time}
              />
            </div>

            <LocationSearch passPlace={passPlace} passTimezone={passTimezone} venueName={game.venueName} />

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
              <label htmlFor="gameLat">Lat</label><br />
              <input 
                  disabled
                  type="text"
                  name="gameLat"
                  placeholder="Latitude"
                  value={game.gameLat}
              />
            </div>

            <div className="form-item">
              <label htmlFor="gameLng">Lng</label><br />
              <input 
                  disabled
                  type="text"
                  name="gameLng"
                  placeholder="Longitude"
                  value={game.gameLng}
              />
            </div>

            <div className="errorDisplay">
                {game.errorText}
            </div>
            
            <div className="form-item">
              <div className="button-row">
                <button onClick={handleSubmit} type='submit' className="btn btn-theme" form="game-edit-form">Save Game</button>
                <button onClick={handleCancel} type='button' className="btn btn-theme">Cancel</button>
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