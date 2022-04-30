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
        organizer: "",
        gameInDatabase: false
      })



      function handleSubmit(){
        console.log(game.date, game.time);
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
              Address 1<br/>
            </div>

            <div className="form-item">
              Address 2<br/>
            </div>

            <div className="form-item">
              City<br/>
            </div>

            <div className="form-item">
              State<br/>
            </div>

            <div className="form-item">
              Zip<br/>
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