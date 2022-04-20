import axios from 'axios';
import React, { useState } from 'react';
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


    const populate = () => {
      //put user's current info into input boxes for potential editing
      

    }


    const buildForm = () => {
      let formData = new FormData();

      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("derbyName", user.derbyName);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("jerseyNumber", user.jerseyNumber);
      formData.append("gender", user.gender);
      formData.append("age", user.age);
      formData.append("userLat", user.userLat);
      formData.append("userLng", user.userLng);

      return formData;
    }


    function handleLocation(lat, lng) {      
      user.userLat = lat.toFixed(4);
      user.userLng = lng.toFixed(4);
    }


    const handleSubmit = (event) => {
      //check for empty form fields, prompt user to fix if any NN fields are empty

      //make axios post call to create/update user with data: buildForm()
      //.then empty state
      //.catch error

      event.preventDefault();
    }


  return (
    <div>
      <UserViewer user={user.currentUser}/>

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
            <input 
              onChange={(event) => {setUser(prevUser => ({
                ...prevUser, email: event.target.value
              }))}} 
              type="text"
              name="email"
              placeholder="Email address (required)"
              maxLength={100}
              required
              value={user.email || ""}/>
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

          <div className="user-form-item">
            <button type='submit' className="btn">Save Profile</button>
          </div>
        </form>

      </div>

    </div>
  )
}

export default UserEditor