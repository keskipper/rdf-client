import React from 'react';

const UserViewer = (props) => {
    let user = props.user;

  return (
    <div className="user-view">
        <div className="user-view-wrapper">
            <div className="user-view-header">
                <h1>Current Information</h1>
            </div>
            <div className="user-view-large">
                {user.derbyName}
            </div>
            <div className="user-view-medium">
                {user.firstName} {user.lastName}
            </div>
            <div className="user-view-small">
                {user.age} years old
            </div>
            <div className="user-view-small">
                {user.gender}
            </div>
            <div className="user-view-small">
                {user.email}
                </div>
            <div className="user-view-small">
                {user.phone}
            </div>
            <div className="user-view-small">
                {user.location}
            </div>
        </div>
    </div>
  )
}

export default UserViewer