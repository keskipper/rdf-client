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
      console.log("populate() called");
      

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

      //TODO get location data

      return formData;
    }


    function handleLocation(lat, lng) {      
      user.userLat = lat.toFixed(4);
      user.userLng = lng.toFixed(4);
    }


    const handleSubmit = (event) => {
      //make axios post call to create/update user with data: buildForm()
      //.then empty state
      //.catch error

      event.preventDefault();
    }


  return (
    <div>
      <UserViewer user={user.currentUser}/>

    <form onSubmit={handleSubmit}>
      <input 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, firstName: event.target.value
        }))}} 
        type="text"
        name="firstName"
        placeholder="Legal first name"
        value={user.firstName}/>

      <input 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, lastName: event.target.value
        }))}} 
        type="text"
        name="lastName"
        placeholder="Legal last name"
        value={user.lastName}/>  

      <input 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, derbyName: event.target.value
        }))}} 
        type="text"
        name="derbyName"
        placeholder="Derby name"
        value={user.derbyName}/>

      <input 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, jerseyNumber: event.target.value
        }))}} 
        type="text"
        name="jerseyNumber"
        placeholder="Preferred jersey number"
        value={user.jerseyNumber}/>

      <select 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, gender: event.target.value
        }))}} 
        name="gender"
        value={user.gender} >
          <option>Female</option>
          <option>Male</option>
          <option>Expansive</option>
        </select>

      <input 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, age: event.target.value
        }))}} 
        type="text"
        name="age"
        placeholder="Age"
        value={user.age}/>

      <input 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, email: event.target.value
        }))}} 
        type="text"
        name="email"
        placeholder="Email address"
        value={user.email || ""}/>

      <input 
        onChange={(event) => {setUser(prevUser => ({
          ...prevUser, phone: event.target.value
        }))}} 
        type="text"
        name="phone"
        placeholder="Phone number"
        value={user.phone}/>

        <Locator handleLocation={handleLocation} />


      <button type='submit' className="btn">Save Profile</button>
    </form>

    </div>
  )
}

export default UserEditor