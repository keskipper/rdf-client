import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProfileGameItem from './profile-game-item';

function ProfileGameDisplay(props) {
    const [ games, setGames ] = useState ({
        gameItems: [],
        rendered: 0
    })
    

    function getGames(event) {
        event.preventDefault();
        let url, data;
        
        if(props.userType === "organizer") {
            url = "http://localhost:8080/api/games/findByOrganizer";
            data = { "organizer": props.userId }
        } else if(props.userType === "skater") {

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



    function contentManager() {
        if(props.userType === "organizer") {

            return (
                <div>
                    <h3>I'm organizing</h3>
                    {games.gameItems.map(g => (
                        <ProfileGameItem
                        key={g.id}
                        game={g}
                        editGame={props.editGame}
                        />
                    ))} 
    
                </div>
            )
        }

        if(props.userType === "skater") {
            return (
                <div>
                    <h3>I'm skating</h3>
                    {games.gameItems.map(g => (
                        <ProfileGameItem
                        key={g.id}
                        game={g}
                        />
                    ))} 
                </div>
            )
        }
    }

  return (
    <div>
        {contentManager()}
    </div>
  )
}

export default ProfileGameDisplay