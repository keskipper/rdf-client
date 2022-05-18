import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReverseGeocoder from './reverse-geocoder';
import ProfileGameDisplay from './profile-game-display';
import CloudinaryUserImage from './cloudinary-user-img';

const UserViewer = (props) => {
    let navigate = useNavigate();

    const [ viewer, setViewer ] = useState({
        user: props.user,
        email: props.email,
        userExists: props.userExists,
        userLocString: "player_o5vlxo"
    })


    function updateViewerUser() {        
        axios({
            method: 'post',
            url: "https://rdf-server.herokuapp.com/api/users/email",
            data: {
              email: viewer.email
            }
          }
        ).then(response => {
          if(response.data.message === "NOTFOUND") {
            navigate("/edit");
          } else {
            setViewer(prevViewer => ({
                ...prevViewer,
                user: response.data
            }))
          }
        }).catch(error => {
          console.log("Error in user-viewer.js updateViewerUser(): ", error)
        })
    }


    useEffect(() => {
        updateViewerUser();
    }, [])


    function calculateAge(birthdate){
        return moment().diff(moment(birthdate, 'YYYYMMDD'), 'years');
    }


    function viewGame(game){
        let gameId = game.id;
        navigate(`/games/${gameId}`);
    }


  return (
    <div className="universal-wrapper">
        <div className="user-view-wrapper">

            <h1>Player Profile</h1>

            <div className="user-view-item">
                <h2>{viewer.user.derbyName}
                &nbsp;#{viewer.user.jerseyNumber}</h2>
            </div>

            <div className="user-view-info">
                <div className="user-view-left">
                    <CloudinaryUserImage 
                        filename={viewer.user.imgName}
                    />
                </div>

                <div className="user-view-right">
                    <div className="user-view-item">
                        {viewer.user.firstName} {viewer.user.lastName}
                    </div>
                    <div className="user-view-item">
                        {calculateAge(viewer.user.birthdate)} years old
                    </div>
                    <div className="user-view-item">
                        {viewer.user.gender}
                    </div>
                    <div className="user-view-item">
                        {viewer.user.email}
                    </div>
                    <div className="user-view-item">
                        {viewer.user.phone.substring(0, 3)}-{viewer.user.phone.substring(3, 6)}-{viewer.user.phone.substring(6, 10)}
                    </div>
                    <div className="user-view-item">
                        <ReverseGeocoder lat={viewer.user.userLat} lng={viewer.user.userLng} />
                    </div>
                </div>
            </div>

            <div className="button-row">
                <div>
                    <Link to="/edit">
                        <button className="btn btn-theme"><FontAwesomeIcon icon="fa-edit" /> Edit Profile</button>
                    </Link>
                    <button className="btn btn-theme" onClick={() => {navigate("/")}}>Close</button>
                </div>
            </div>

            <div className="my-games-wrapper">
                <div><h1>My Games</h1></div>
                <button onClick={() => {navigate("/search")}} type='button' className="btn btn-theme">
                    <FontAwesomeIcon icon="fa-magnifying-glass" /> Find games!
                </button>
                
                <div className="my-games">
                    <ProfileGameDisplay 
                    userType="organizer" 
                    userId={viewer.user.id}
                    editGame={props.editGame}
                    />

                    <ProfileGameDisplay 
                    userType="skater" 
                    email={viewer.user.email}
                    userId={viewer.user.id}
                    handleClick={viewGame}
                    />    
                </div>                                
            </div>
        </div>  
    </div>
  )
}

export default UserViewer