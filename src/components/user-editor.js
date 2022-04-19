import React, { useState } from 'react';
import Locator from './locator';


function UserEditor() {
    const [ user, setUser ] = useState({
      firstName: "",
      lastName: "",
      derbyName: "",
      email: "",
      phone: "",
      jerseyNumber: "",
      gender: "",
      age: "",
      userLat: "",
      userLng: ""
    })


    const buildForm = () => {
      let formData = new FormData();

      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("derbyName", this.state.derbyName);
      formData.append("email", this.state.email);
      formData.append("phone", this.state.phone);
      formData.append("jerseyNumber", this.state.jerseyNumber);
      formData.append("gender", this.state.gender);
      formData.append("age", this.state.age);

      //TODO get location data

      return formData;
    }

    const handleSubmit = (event) => {
      //make axios call with data: buildForm()
      //.then empty state
      //.catch error



      event.preventDefault();
    }


    // const handleChange = (event) => {
    //   setState({
    //       [event.target.name]: event.target.value
    //   })
    // }

  



  return (
    <div>
        <h1>Current Information</h1>
        {user.derbyName}
        ({user.firstName} {user.lastName})
        {user.age} years old
        {user.gender}
        {user.email}
        {user.phone}
        {user.location}

    <form onSubmit={handleSubmit}>
      <input 
        onChange={e => setUser.firstName(e.target.value)} 
        type="text"
        name="firstName"
        placeholder="Legal first name"
        value={user.firstName}/>








      <button className="btn">Save Profile</button>
    </form>

    </div>
  )
}

export default UserEditor