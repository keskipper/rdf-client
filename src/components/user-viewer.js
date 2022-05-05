import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import UserEditor from './user-editor';
import player from '../static/player.jpg';
import ReverseGeocoder from './reverse-geocoder';

const UserViewer = (props) => {
    const [ viewer, setViewer ] = useState({
        user: props.user,
        email: props.email,
        userExists: props.userExists,
        editMode: props.editMode,
        userLocString: ""
    })
    

    function toggleEditMode() {
        setViewer(prevViewer => ({
            ...prevViewer,
            editMode: !prevViewer.editMode
        }))
    }


    function hideEditor() {
        setViewer(prevViewer => ({
            ...prevViewer,
            editMode: false,
            userExists: true
        }))
    }


    function updateViewerUser(props) {
        axios({
            method: 'post',
            url: "http://localhost:8080/api/users/email",
            data: {
              email: props
            }
          }
        ).then(response => {
          if(response.data.message === "NOTFOUND") {
            console.log("user not found with email", viewer.user.email);
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



    if(!viewer.userExists || viewer.editMode === true) {
        return (
            <UserEditor 
            email={viewer.email}
            userExists={viewer.userExists}
            user={viewer.user}
            toggleUserProfile={props.toggleUserProfile}
            toggleEditMode={toggleEditMode}
            hideEditor={hideEditor}
            updateViewerUser={updateViewerUser}
            handleSuccessfulLogout={props.handleSuccessfulLogout}
            />
        )
    }


    function calculateAge(birthdate){
        return moment().diff(moment(birthdate, 'YYYYMMDD'), 'years');
    }



  return (
    <div className="user-view">
        <div className="user-view-wrapper">
            <div className="user-view-item">
                <h1>Player Profile</h1>
            </div>



            <div className="user-view-info">
                <div className="user-view-left">
                    <img alt="roller derby player silhouette" src={player} />
                </div>

                <div className="user-view-right">

                    <div className="user-view-item">
                        <h2>{viewer.user.derbyName}
                        &nbsp;#{viewer.user.jerseyNumber}</h2>
                    </div>
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

            <div className="user-view-buttons">
                <div><button className="btn btn-theme" onClick={toggleEditMode}>Edit Profile</button>&nbsp;&nbsp;&nbsp;
                <button className="btn btn-theme" onClick={props.toggleUserProfile}>Close</button></div>
            </div>
        </div>

        
    </div>
  )
}

export default UserViewer