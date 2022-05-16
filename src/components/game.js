import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactModal from 'react-modal';

import JoinGame from '../modals/join-game';
import { ContactOrganizer } from '../modals/contact-organizer';

import Header from '../static/game-header.jpg';

function Game(props) {
    let params = useParams();
    let navigate = useNavigate();

    const [ game, setGame ] = useState({
        game: {},
        showJoinModal: false,
        showContactModal: false,
        userRelation: ""
    })


    function getGame() {        
        axios({
            method: 'get',
            url: `http://localhost:8080/api/games/${params.gameId}`
          }
        ).then(response => {
            setGame(prevGame => ({
                ...prevGame,
                game: response.data
            }));
            getUserRelation(response.data.id);
        }).catch(error => {
          console.log("Error in game.js getGame(): ", error)
        })
    }


    function getUserRelation(gameId){
        axios({
            method: 'post',
            url: `http://localhost:8080/api/jct_users_games/findRelation`,
            data: {
                userId: props.userId,
                gameId: gameId
            }
          }
        ).then(response => {
            if(response.data.length > 0){
                setGame(prevGame => ({
                    ...prevGame,
                    userRelation: response.data[0].joinType
                }));
            }
        }).catch(error => {
          console.log("Error in getUserRelation():", error)
        })
    }


    useEffect(() => {
        getGame();        
    }, [])


    function formatDate(datetime) {
        let date;
        if(datetime){
            date = new Date(datetime).toLocaleString('en-US', { timeZone: game.game.timezoneString });
            let temp = date.split(",");
            date = temp[0] + " at " + temp[1].substring(1, temp[1].lastIndexOf(":")) + temp[1].substring(temp[1].length-3, temp[1].length) + " (" + game.game.timezoneAbbr + ")";
        }
        return date;
    }

    function zerofillZip(zip) {
        if(!zip) return;
        zip = zip.toString();
        if(zip.length === 5) return zip;
        if(zip.length === 4) return "0" + zip;
        if(zip.length === 3) return "00" + zip;
        if(zip.length === 2) return "000" + zip;
        if(zip.length === 1) return "oooo" + zip;
    }


    function formatGender(gender){
        if(gender === "expansive"){
            return "all genders of"
        } else return gender
    }


    function handleJoinClick(){
        setGame(prevGame => ({
            ...prevGame,
            showJoinModal: true
        }))
    }


    function handleContactClick(){
        setGame(prevGame => ({
            ...prevGame,
            showContactModal: true
        }))
    }


    function handleCloseModal(){
        setGame(prevGame => ({
            ...prevGame,
            showJoinModal: false,
            showContactModal: false
        }));
        getGame();
    }


    function handleEditClick(){
        props.editGame(game.game);
        navigate("/create");
    }


    function handleCloseClick(){
        navigate("/search");
    }


    function formatUserRelation(){
        if(game.userRelation === 'official'){
            return "a skating official"
        } else if(game.userRelation === 'player'){
            return "a player"
        } else if(game.userRelation === 'nso'){
            return "an NSO"
        }
    }


    return (
        <div className="universal-wrapper">
            <div className="game-wrapper">
                <div className="game-header">
                    <img src={Header} alt="skaters on a rink" />
                </div>
                <div className="game-body">
                    <ReactModal 
                    isOpen={game.showJoinModal}
                    contentLabel="Join game"
                    ariaHideApp={false}            
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={handleCloseModal}
                    className="modal"
                    overlayClassName="overlay"
                    >
                        <JoinGame 
                            userId={props.userId}
                            game={game.game}
                            handleCloseModal={handleCloseModal}
                            joinType={game.joinType}
                        />
                    </ReactModal>

                    <ReactModal 
                    isOpen={game.showContactModal}
                    contentLabel="Contact organizer"
                    ariaHideApp={false}            
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={handleCloseModal}
                    className="modal"
                    overlayClassName="overlay"
                    >
                        <ContactOrganizer 
                            organizerEmail={props.user.email}
                            organizerName={props.user.firstName}
                            closeModal={handleCloseModal}
                        />
                    </ReactModal>

                    <div><h2>{game.game.title}</h2></div>
                    <div>Hosted by {game.game.hostingLeague}</div>
                    <div>{formatDate(game.game.date)}</div><br/>
                    <div>{game.game.venueName}</div>
                    <div>{game.game.address1}</div>
                    <div>{game.game.address2}</div>
                    <div>{game.game.city}, {game.game.state} {zerofillZip(game.game.zip)}</div>

                    <div className="game-content">
                        {game.game.description}
                    </div>

                    {game.game.skaterRoster === "open"
                    ? <div className="open">Roster is {game.game.skaterRoster} for {formatGender(game.game.gameGender)} {game.game.adult} skaters</div>
                    : <div className="closed">Roster is {game.game.skaterRoster} for skaters</div>
                    }
                    
                    {game.game.officialRoster === "open"
                    ? <div className="open">Roster is {game.game.officialRoster} for officials</div>
                    : <div className="closed">Roster is {game.game.officialRoster}</div>
                    }
                </div>

                {game.userRelation
                ? <div style={{ color: 'purple', fontWeight: 700, padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>You are in this game as {formatUserRelation()}!</div>
                    <div>If you can't make it, contact the organizer.</div>
                    </div>
                : null}

                <div className="button-row">

                    {(game.game.skaterRoster === "open" || game.game.officialRoster === "open") && !game.userRelation
                    ? <button onClick={handleJoinClick} type='button' className="btn btn-theme">
                            <FontAwesomeIcon icon="fa-solid fa-play" /> Join game!</button>
                    : null }

                    <button onClick={handleContactClick} type='button' className="btn btn-theme">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" /> Contact organizer
                    </button>

                    {props.userId === game.game.organizer
                    ? <button onClick={handleEditClick} type='button' className="btn btn-theme">
                        <FontAwesomeIcon icon="fa-edit" /> Edit game</button>
                    : null }

                    <button onClick={handleCloseClick} type='button' className="btn btn-theme">
                        <FontAwesomeIcon icon="fa-solid fa-ban" /> Close
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Game