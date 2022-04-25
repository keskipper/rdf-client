import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserEditor = (props) => {
    const [ user, setUser ] = useState({
      firstName: "",
      lastName: "",
      derbyName: "",
      email: props.email,
      phone: "",
      jerseyNumber: "",
      gender: "",
      age: "",
      userLat: "",
      userLng: "",
      userInDatabase: props.userExists,
      currentUser: props.user,
      status: ""
    })


    useEffect(() => {
      if(user.userInDatabase) {
        setUser(prevUser => ({
          ...prevUser,
          firstName: user.currentUser.firstName,
          lastName: user.currentUser.lastName,
          derbyName: user.currentUser.derbyName,
          phone: user.currentUser.phone,
          jerseyNumber: user.currentUser.jerseyNumber,
          gender: user.currentUser.gender,
          age: user.currentUser.age,
          userLat: user.currentUser.userLat,
          userLng: user.currentUser.userLng
        }))   
      }

    },[]);



    function getLocation(event) {
      event.preventDefault();
      if (!navigator.geolocation) {
        setUser(prevUser => ({
          ...prevUser,
          status: 'Geolocation is not supported by your browser.'
        }))
      } else {
        setUser(prevUser => ({
          ...prevUser,
          status: 'Locating...'
        }))

        navigator.geolocation.getCurrentPosition((position) => {
            setUser(prevUser => ({
              ...prevUser,
              userLat: position.coords.latitude.toFixed(4),
              userLng: position.coords.longitude.toFixed(4),
              status: `${position.coords.latitude}, ${position.coords.longitude}`
            }))
        }, () => {
          setUser(prevUser => ({
            ...prevUser,
            status: 'Unable to retrieve your location.'
          }))
        });
      }
    }


    const buildBodyObject = () => {
      let bodyObj = "";

      bodyObj = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "derbyName": user.derbyName,
        "phone": user.phone,
        "email": user.email,
        "jerseyNumber": user.jerseyNumber,
        "gender": user.gender,
        "age": user.age,
        "userLat": user.userLat,
        "userLng": user.userLng
      }

      return bodyObj;
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      
      let verb = "";
      let url = "http://localhost:8080/api/users/";

      if(props.userExists){ 
        verb = "PUT";
        url = `http://localhost:8080/api/users/${user.currentUser.id}`;
      }
      if(!props.userExists){
        console.log("user not in database");
        verb = "POST";
      }

      axios({
        method: verb,
        url,
        data: buildBodyObject()
      }
      ).then(response => {
        console.log("server response: ", response);

        if(response.status === 200) {
          setUser({
            firstName: "",
            lastName: "",
            derbyName: "",
            email: props.email,
            phone: "",
            jerseyNumber: "",
            gender: "",
            age: "",
            userLat: "",
            userLng: "",
            userInDatabase: true,
            userExists: true,
            currentUser: response.data
          })
          props.hideEditor();
          props.updateViewerUser(user.email);
        }
      }).catch(error => {
          console.log("error in handleSubmit(): ", error.response.data)
      });
    }


    const handleDelete = (event) => {
      //event.preventDefault();

      axios({
        method: "delete",
        url: `http://localhost:8080/api/users/${user.currentUser.id}`
      }
      ).then(response => {
        console.log("server response: ", response);

        if(response.status === 200) {
          setUser({
            firstName: "",
            lastName: "",
            derbyName: "",
            email: props.email,
            phone: "",
            jerseyNumber: "",
            gender: "",
            age: "",
            userLat: "",
            userLng: "",
            userInDatabase: false,
            userExists: false,
            currentUser: {}
          })
          props.handleSuccessfulLogout();
          props.hideUserProfile();
        }
      }).catch(error => {
          console.log("error in handleSubmit(): ", error.response.data)
      });
    }


  return (
    <div>
      <div className="form-wrapper">
        <div className="form-item">
          <h1>Player Profile</h1>
        </div>

        <form id="user-edit-form" autoComplete='off'>
          <div className="form-item">
            Legal first name<br/>
            <input 
              role="presentation"
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, firstName: event.target.value
              }))}} 
              type="text"
              name="firstName"
              placeholder="Legal first name (required)"
              maxLength={45}
              required
              value={user.firstName}/>
          </div>

          <div className="form-item">
            Legal last name<br/>
            <input 
              role="presentation"
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, lastName: event.target.value
              }))}} 
              type="text"
              name="lastName"
              placeholder="Legal last name (required)"
              maxLength={45}
              required
              value={user.lastName}/>  
          </div>

          <div className="form-item">
            Derby name<br/>
            <input 
              role="presentation"
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, derbyName: event.target.value
              }))}} 
              type="text"
              name="derbyName"
              placeholder="Derby name"
              maxLength={45}
              value={user.derbyName}/>
          </div>

          <div className="form-item">
            Jersey number<br/>
            <input 
              role="presentation"
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, jerseyNumber: event.target.value
              }))}} 
              type="text"
              name="jerseyNumber"
              placeholder="Preferred jersey number"
              maxLength={4}
              value={user.jerseyNumber}/>
          </div>

          <div className="form-item">
            Gender<br/>
            <select 
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, gender: event.target.value
              }))}} 
              name="gender"
              required
              value={user.gender} >
                <option value="">Select one</option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="expansive">expansive</option>
            </select>
          </div>

          <div className="form-item">
            Age<br/>
            <input 
              role="presentation"
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, age: event.target.value
              }))}} 
              type="text"
              name="age"
              placeholder="Age (required)"
              maxLength={3}
              required
              value={user.age}/>  
          </div>

          <div className="form-item">
            Email<br/>
            {user.email}
            <div className="tiny-note">To change your email address, sign in with another Google account.</div>
          </div>

          <div className="form-item">
            Phone<br/>
            <input 
              role="presentation"
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, phone: event.target.value
              }))}} 
              type="text"
              name="phone"
              placeholder="Phone number"
              maxLength={10}
              value={user.phone}/>
          </div>

          <div className="form-item">
            Location: {user.status}<br/>
            <button onClick={getLocation} type='button' className='btn btn-theme'>Locate me!</button>
          </div>

          <div className="form-item">
            <button onClick={handleSubmit} type='submit' className="btn btn-theme" form="user-edit-form">Save Profile</button>&nbsp;&nbsp;
            {user.userInDatabase ?
            <button onClick={handleDelete} type='submit' className="btn btn-delete">Delete Profile</button>
            : null
            }
            
          </div>
        </form>

      </div>

    </div>
  )
}

export default UserEditor