import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Locator from './locator';


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


    const buildBodyObject = () => {
      let bodyObj = "";

      bodyObj = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "derbyName": user.derbyName,
        "phone": user.phone,
        "jerseyNumber": user.jerseyNumber,
        "gender": user.gender,
        "age": user.age
      }

      return bodyObj;
    }


    function handleLocation(lat, lng) {  
      setUser(prevUser => ({
        ...prevUser,
        userLat: lat.toFixed(4),
        userLng: lng.toFixed(4)
      }))
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      
      let verb = "";
      let url = "http://localhost:8080/api/users/";
      if(props.userExists){ 
        console.log("user id:", user.currentUser.id);
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
        console.log("server response: ",response);
   
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
          currentUser: response.data
        })
        props.toggleEditMode();
        props.updateViewerUser();
        

      }).catch(error => {
          console.log("error in handleSubmit(): ", error)
      });
    }


  return (
    <div>
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