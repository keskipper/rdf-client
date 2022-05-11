import React from 'react';

import zebra from '../static/zebra.png';

function ProfileGameItem(props) {

    function formatDate(datetime) {
        let date = new Date(datetime).toLocaleString('en-US', { timeZone: props.game.timezoneString });
        let temp = date.split(",");
        date = temp[0] + " at " + temp[1].substring(1, temp[1].lastIndexOf(":")) + temp[1].substring(temp[1].length-3, temp[1].length) + " (" + props.game.timezoneAbbr + ")";
        
        return date;
    }

    function handleClick(){
        props.handleClick(props.game, props.userType);
    }

  return (
    <div className="profile-game-item-wrapper" onClick={handleClick}>
        <div className="profile-game-item">
            
            <div>
                <div className="info info-top">{props.game.title}</div>
                <div className="info info-bottom">{formatDate(props.game.date)}</div>
            </div>
            {props.game.joinType === "official" || props.game.joinType === "nso"
            ? <img alt="zebra icon indicates skater is officiating" src={zebra} />
            : null}
            
        </div>

    </div>

  )
}

export default ProfileGameItem