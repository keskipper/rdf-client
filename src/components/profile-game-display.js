import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProfileGameItem from './profile-game-item';
import { useNavigate } from 'react-router-dom';

function ProfileGameDisplay(props) {
    let navigate = useNavigate();

    const [ games, setGames ] = useState ({
        gameItems: [],
        rendered: 0,
        show: false
    })
    

    function getGames(event) {
        event.preventDefault();
        let url, data;
        
        if(props.userType === "organizer") {
            url = "http://localhost:8080/api/games/findByOrganizer";
            data = { "organizer": props.userId }
        } else if(props.userType === "skater") {
            url = "http://localhost:8080/api/games/findGamesWhereUserJoined";
            data = { "email": props.email }
        } else {
            console.log("User type is not recognized.");
            return;
        }
        
        axios({
          method: "post",
          url: url,
          data: data
        }).then(response => {
          setGames(prevGames => ({
            ...prevGames,
            gameItems: response.data
          }))
        }).catch(error => {
          console.log("error in profile-game-display getGames(): ", error)
        });
    }


    useEffect(() => {
        getGames(window.event);
    }, [])


    useEffect(() => {
        if(games.gameItems.length > 0){
            setGames(prevGames => ({
                ...prevGames,
                show: true
            }))
        }
    }, [games.gameItems])



    function handleClick(game, userType){
        if(userType === "skater") {
            let gameId = game.id;
            navigate(`/games/${gameId}`);
        } else if(userType === "organizer"){
            props.editGame(game);
            navigate("/create");
        }
    }



    function contentManager() {
        if(props.userType === "organizer") {
            if(games.gameItems.length > 0){
                return (
                    <div className="games-list">
                        <h3>I'm organizing (click to edit)</h3>
                        {games.gameItems.map(g => (
                            <ProfileGameItem
                            key={g.id}
                            game={g}
                            userType={props.userType}
                            handleClick={handleClick}
                            />
                        ))} 
                    </div>
                )
            } else {
                return null;
            }
        }

        if(props.userType === "skater") {
            if(games.gameItems.length > 0){
                return (
                    <div className="games-list">
                        <h3>I've joined (click to view)</h3>
                        {games.gameItems.map(g => (
                            <ProfileGameItem
                            key={g.id}
                            game={g}
                            userType={props.userType}
                            handleClick={handleClick}
                            />
                        ))} 
                    </div>
                )
            } else {
                return null;
            }
        }
    }

  return (
    <div className="my-games-layout" style={{ display: games.show? "block" : "none" }}>
        {contentManager()}
    </div>
  )
}

export default ProfileGameDisplay