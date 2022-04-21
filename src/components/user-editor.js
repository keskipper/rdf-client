import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Locator from './locator';

import UserViewer from './user-viewer';


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
      currentUser: props.user
    })


    useEffect(() => {
      // KNOWNBUG this doesn't populate until the user starts typing
      if(user.userInDatabase) {
        setUser({
          firstName: user.currentUser.firstName,
          lastName: user.currentUser.lastName,
          derbyName: user.currentUser.derbyName,
          phone: user.currentUser.phone,
          jerseyNumber: user.currentUser.jerseyNumber,
          gender: user.currentUser.gender,
          age: user.currentUser.age,
          userLat: user.currentUser.userLat,
          userLng: user.currentUser.userLng
        })       
      }
    },[]);


    const buildForm = () => {
      

      // console.log("Form data: ", formData);
      // return formData;


    //   {
    //     "firstName": "Katherine",
    //     "lastName": "Skipper",
    //     "derbyName": "Criminal Wrecker",
    //     "phone": "6038011463",
    //     "jerseyNumber": 16,
    //     "gender": "female",
    //     "age": 34
    // }
    }


    function handleLocation(lat, lng) {      
      user.userLat = lat.toFixed(4);
      user.userLng = lng.toFixed(4);
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      
      let verb = "";
      let url = "http://localhost:8080/api/users/";
      if(user.userInDatabase){ 
        verb = "PUT";
        url = `http://localhost:8080/api/users/${user.currentUser.id}`;
      }
      if(!user.userInDatabase){
        verb = "POST";
      }

      axios({
        method: verb,
        url,
        data: buildForm()
      }
      ).then(response => {
        console.log("response: ",response);

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
          userLng: ""
        })

    }).catch(error => {
        console.log("error in handleSubmit(): ", error)
    });


    }


  return (
    <div>
      {/* <UserViewer user={user.currentUser}/> */}

      <div className="user-form-wrapper">
        <div className="user-form-header">
          Update profile:
        </div>

        <form onSubmit={handleSubmit}>
          <div className="user-form-item">
            <input 
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

          <div className="user-form-item">
            <input 
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

          <div className="user-form-item">
            <input 
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, derbyName: event.target.value
              }))}} 
              type="text"
              name="derbyName"
              placeholder="Derby name"
              maxLength={45}
              value={user.derbyName}/>
          </div>

          <div className="user-form-item">
            <input 
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, jerseyNumber: event.target.value
              }))}} 
              type="text"
              name="jerseyNumber"
              placeholder="Preferred jersey number"
              maxLength={4}
              value={user.jerseyNumber}/>
          </div>

          <div className="user-form-item">
            <select 
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, gender: event.target.value
              }))}} 
              name="gender"
              value={user.gender} >
                <option>female</option>
                <option>male</option>
                <option>expansive</option>
            </select>
          </div>

          <div className="user-form-item">
            <input 
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

          <div className="user-form-item">
              To change your email address, sign in with another Google account.
          </div>

          <div className="user-form-item">
            <input 
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, phone: event.target.value
              }))}} 
              type="text"
              name="phone"
              placeholder="Phone number"
              maxLength={10}
              value={user.phone}/>
          </div>

          <div className="user-form-item">
            <Locator handleLocation={handleLocation} />
          </div>
          {/* KNOWNBUG: if user presses locator button before filling out required form elements, HTML form validation will trigger. */}

          <div className="user-form-item">
            <button type='submit' className="btn">Save Profile</button>
          </div>
        </form>

      </div>

    </div>
  )
}

export default UserEditor