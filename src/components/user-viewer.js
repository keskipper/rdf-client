import React, { useState } from 'react';
import axios from 'axios';

import UserEditor from './user-editor';

const UserViewer = (props) => {
    const [ viewer, setViewer ] = useState({
        user: props.user,
        userExists: props.userExists,
        editMode: props.editMode
    })


    function toggleEditMode() {
        setViewer(prevViewer => ({
            ...prevViewer,
            editMode: !prevViewer.editMode
        }))
    }


    function updateViewerUser() {
        axios({
            method: 'post',
            url: "http://localhost:8080/api/users/email",
            data: {
              email: viewer.user.email
            }
          }
        ).then(response => {
          if(response.data.message === "NOTFOUND") {
            console.log("user not found");
          } else {
            setViewer( prevViewer => ({
                ...prevViewer,
                user: response.data
            }))
          }
          
        }).catch(error => {
          console.log("Error in user-viewer.js updateViewerUser(): ", error)
        })
    }


    if(viewer.editMode) {
        if(!viewer.userExists || viewer.editMode === true) {
            return (
                <UserEditor 
                email={viewer.user.email}
                userExists={viewer.userExists}
                user={viewer.user}
                showUserProfile={props.showUserProfile}
                hideUserProfile={props.hideUserProfile}
                toggleEditMode={toggleEditMode}
                updateViewerUser={updateViewerUser}
                />
            )
        }
    }


  return (
    <div className="user-view">
        <div className="user-view-wrapper">
            <div className="user-view-header">
                <h1>Current Information</h1>
            </div>
            <div className="user-view-large">
                {viewer.user.derbyName}
            </div>
            <div className="user-view-small">
                #{viewer.user.jerseyNumber}
            </div>
            <div className="user-view-medium">
                {viewer.user.firstName} {viewer.user.lastName}
            </div>
            <div className="user-view-small">
                {viewer.user.age} years old
            </div>
            <div className="user-view-small">
                {viewer.user.gender}
            </div>
            <div className="user-view-small">
                {viewer.user.email}
                </div>
            <div className="user-view-small">
                {viewer.user.phone}
            </div>
            <div className="user-view-small">
                {viewer.user.location}
            </div>
            <button onClick={toggleEditMode}>Edit Profile</button>
        </div>

        
    </div>
  )
}

export default UserViewer