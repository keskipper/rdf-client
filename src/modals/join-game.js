import React, { useState } from 'react';
import axios from 'axios';

function JoinGame(props) {
    const [ join, setJoin ] = useState({
        joinType: "player",
        btnStatus: false,
        btnClass: "btn btn-disabled",
        status: ""
    })


    function handleChange() {
        if(window.event.target.checked){
            setJoin(prevJoin => ({
                ...prevJoin, btnStatus: true, btnClass: "btn btn-theme"
            }))
        } else {
            setJoin(prevJoin => ({
                ...prevJoin, btnStatus: false, btnClass: "btn btn-disabled"
            }))
        }
    }


    function setStatus(newStatus){
        setJoin(prevJoin => ({
            ...prevJoin, status: newStatus
        }))
    }


    function handleJoinClick(){
        window.event.preventDefault();
        
        axios({
            method: 'post',
            url: `https://rdf-server.herokuapp.com/api/jct_users_games`,
            data: {
                userId: props.userId,
                gameId: props.game.id,
                joinType: join.joinType
            }
        }
        ).then(response => {
            if(response.status === 200){
                setStatus("Welcome to the game!");
            }
        }).catch(error => {
            console.log("Error in join-game.js handleJoinClick(): ", error)
        })

    }


    function createDropdownArray(){
        let dropdown = [];
        if(props.game.skaterRoster === "open") dropdown.push('Player')
        if(props.game.officialRoster === "open") dropdown.push('Official')
        if(props.game.nsoRoster === "open") dropdown.push('NSO')
        return dropdown;
    }


  return (
    <div className="modal-wrapper">
        <div><h2>You are about to join {props.game.title}</h2></div>

        <div className="form-wrapper">
            <form id="join-form">
            <div className="form-item"><h3>{props.game.hostingLeague} is excited to have you!</h3></div>

            <div className="form-item">
                    <label htmlFor="join-type">How will you join this game?</label><br/>
                    <select 
                        onChange={(event) => {
                            console.log(event.target);
                            setJoin(prevJoin => ({
                        ...prevJoin, joinType: event.target.value
                        }))}} 
                        name="join-type"
                        required
                        value={join.joinType} >
                        {createDropdownArray().map((x,y) =>
                            <option key={y} value={x}>{x}</option>)}
                    </select>
                </div>

                <div className="form-item">
                    <input type="checkbox" id="consent" name="consent" value="consent" onChange={handleChange}/>
                    <label htmlFor="consent"> I understand that my full name and contact information will be sent to the game's organizer,
                        and they may contact me with the information I've provided, including my email address and phone number.</label>
                </div>

                <div style={{ color: 'green', fontWeight: '700' }}>{join.status}</div>

                <div className="button-row">
                    <button onClick={handleJoinClick} type='submit' form="join-form" className={join.btnClass} disabled={!join.btnStatus}>Join</button>
                    <button onClick={props.handleCloseModal} type='button' className="btn btn-theme">Close</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default JoinGame