import React, { useState } from 'react'

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
        organizer1: "",
        organizer2: "",
        organizer3: ""
      })



      function handleSubmit(){

      }



      function handleDelete(){

      }


  return (
    <div>
      <div className="game-form-wrapper">
        <div className="game-form-item">
          <h1>Create Game</h1>
        </div>

        <form id="game-edit-form">
          <div className="game-form-item">
            Title<br/>
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

          <div className="game-form-item">
            Description<br/>
            <input 
              role="presentation"
              onChange={(event) => {setGame(prevGame => ({
                ...prevGame, description: event.target.value
              }))}} 
              type="textbox"
              name="description"
              placeholder="Game description (required)"
              maxLength={255}
              required
              value={game.description}/>  
          </div>

          <div className="game-form-item">
            Venue name<br/>
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

          <div className="game-form-item">
            Date<br/>
          </div>

          <div className="game-form-item">
            Time<br/>
          </div>

          <div className="game-form-item">
            Address 1<br/>
          </div>

          <div className="game-form-item">
            Address 2<br/>
          </div>

          <div className="game-form-item">
            City<br/>
          </div>

          <div className="game-form-item">
            State<br/>
          </div>

          <div className="game-form-item">
            Zip<br/>
          </div>
          

          <div className="game-form-item">
            <button onClick={handleSubmit} type='submit' className="btn btn-theme" form="game-edit-form">Save Game</button>&nbsp;&nbsp;
            <button onClick={handleDelete} type='submit' className="btn btn-delete">Delete Game</button>
          </div>
        </form>

      </div>

    </div>
  )
}

export default GameBuilder