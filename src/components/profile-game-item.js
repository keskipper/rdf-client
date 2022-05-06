import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfileGameItem(props) {

    function formatDate(datetime) {
        let date = new Date(datetime).toLocaleString('en-US', { timeZone: props.game.timezoneString });
        let temp = date.split(",");
        date = temp[0] + " at " + temp[1].substring(1, temp[1].lastIndexOf(":")) + temp[1].substring(temp[1].length-3, temp[1].length) + " (" + props.game.timezoneAbbr + ")";
        
        return date;
    }

    function triggerEdit(){
        props.editGame(props.game);
    }

  return (
    <div className="profile-game-item-wrapper">
        <div className="profile-game-item">
            
            <div><button onClick={triggerEdit} type='button' className="btn btn-theme"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button></div>
            <div>
                <div className="info">{props.game.title}</div>
                <div className="info">{formatDate(props.game.date)}</div>
            </div>

        </div>

    </div>

  )
}

export default ProfileGameItem