import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReverseGeocoder from './reverse-geocoder';


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
      birthdate: "",
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
          birthdate: user.currentUser.birthdate,
          userLat: user.currentUser.userLat,
          userLng: user.currentUser.userLng
        }))   
      }
      console.log(user.currentUser);
    },[]);


    function getLocation(event) {
      event.preventDefault();
      if (!navigator.geolocation) {
        setUser(prevUser => ({
          ...prevUser,
          status: "Your browser doesn't want us to find you. (Geolocation is not supported.)"
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
              status: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
            }))
        }, () => {
          setUser(prevUser => ({
            ...prevUser,
            status: "We couldn't locate you. Are you missing?"
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
        "userLng": user.userLng,
        "birthdate": user.birthdate
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
            birthdate: "",
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
            birthdate: "",
            userInDatabase: false,
            userExists: false,
            currentUser: {}
          })
          props.handleSuccessfulLogout();
          props.toggleUserProfile();
        }
      }).catch(error => {
          console.log("error in handleSubmit(): ", error.response.data)
      });
    }


  return (
    <div className="user-editor">
      <div className="user-editor-wrapper">
        <div className="form-wrapper">
          <div className="form-item">
            <h1>Player Profile</h1>
          </div>

          <form id="user-edit-form" autoComplete='off'>
            <div className="form-item">
              <label htmlFor="firstName">Legal first name</label><br/> 
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
              <label htmlFor="lastName">Legal last name</label><br/> 
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
              <label htmlFor="derbyName">Derby name</label><br/> 
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
              <label htmlFor="jerseyNumber">Jersey number</label><br/> 
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
              <label htmlFor="gender">Gender</label><br/>
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
              <label htmlFor="birthdate">Birthdate</label><br/> 
              <input 
                role="presentation"
                onChange={(event) => {setUser(prevUser => ({
                  ...prevUser, birthdate: event.target.value
                }))}} 
                type="date"
                name="birthdate"
                required
                value={user.birthdate}/>  
            </div>

            <div className="form-item">
            <label htmlFor="email">Email</label><br/> 
              <input
                name="email"
                disabled
                value={user.email}
              />
              <div className="tiny-note">To change your email address, sign in with another Google account.</div>
            </div>

            <div className="form-item">
              <label htmlFor="phone">Phone</label><br/> 
              <input 
                role="presentation"
                onChange={(event) => {setUser(prevUser => ({
                  ...prevUser, phone: event.target.value
                }))}} 
                type="tel"
                name="phone"
                placeholder="Phone number"
                maxLength={10}
                value={user.phone}/>
            </div>

            <div className="form-item">
              <div className="locate-me">
                <div className="locate-me-top">
                  <button onClick={getLocation} type='button' className='btn btn-theme'>Locate me!</button>
                </div>
                <div className="locate-me-bottom">
                  Location: {user.status} <ReverseGeocoder lat={user.userLat} lng={user.userLng} />
                </div>
              </div>
            </div>

            <div className="button-row">
              <button onClick={handleSubmit} type='submit' className="btn btn-theme" form="user-edit-form">Save Profile</button>
              <button onClick={props.toggleEditMode} type='submit' className="btn btn-theme">Cancel</button>
              {user.userInDatabase
              ? <button onClick={handleDelete} type='submit' className="btn btn-delete">Delete Profile</button>
              : <button type='button' className="btn btn-disabled">Delete Profile</button>
              }
              
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}

export default UserEditor