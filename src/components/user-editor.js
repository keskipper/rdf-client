import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CloudinaryUserImage from './cloudinary-user-img';
import CloudinaryUploadWidget from './cloudinary-upload-widget';


const UserEditor = (props) => {
    let navigate = useNavigate();

    const [ user, setUser ] = useState({
      firstName: "",
      lastName: "",
      derbyName: "",
      email: props.email,
      phone: "",
      jerseyNumber: "",
      gender: "",
      userLat: "",
      userLng: "",
      birthdate: "",
      userInDatabase: props.userExists,
      currentUser: props.user,
      status: "",
      error: ""
    })


    useEffect(() => {
      if(user.userInDatabase) {
        axios({
          method: 'post',
          url: "https://rdf-server.herokuapp.com/api/users/email",
          data: {
            email: user.email
          }
        }
      ).then(response => {
        if(response.data.message === "NOTFOUND") {
          console.log("user not found with email", user.email);
        } else {
          setUser(prevUser => ({
            ...prevUser,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            derbyName: response.data.derbyName,
            phone: response.data.phone,
            jerseyNumber: response.data.jerseyNumber,
            gender: response.data.gender,
            birthdate: response.data.birthdate.substring(0, 10),
            userLat: response.data.userLat,
            userLng: response.data.userLng,
            status: response.data.userLat + ", " + response.data.userLng
          }))  
        }
      }).catch(error => {
        console.log("Error in user-editor.js useEffect(): ", error)
      })
      }
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
        "userLat": user.userLat,
        "userLng": user.userLng,
        "birthdate": user.birthdate
      }
      return bodyObj;
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      
      let verb = "";
      let url = "https://rdf-server.herokuapp.com/api/users/";

      if(props.userExists){ 
        verb = "PUT";
        url = `https://rdf-server.herokuapp.com/api/users/${user.currentUser.id}`;
      }
      if(!props.userExists){
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
            userInDatabase: true,
            userExists: true,
            currentUser: response.data
          })
          if(verb === "POST"){
            props.populateNewUser(response.data);
          }
          navigate("/profile");
        }
      }).catch(error => {
          console.log("error in handleSubmit(): ", error.response);
      });
    }


    const handleDelete = (event) => {
      event.preventDefault();

      axios({
        method: "delete",
        url: `https://rdf-server.herokuapp.com/api/users/${user.currentUser.id}`
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
            userLat: "",
            userLng: "",
            birthdate: "",
            userInDatabase: false,
            userExists: false,
            currentUser: {}
          })
          props.clearUser();
          navigate("/");
        }
      }).catch(error => {
          console.log("error in handleSubmit(): ", error.response.data)
      });
    }


  return (
      <div className="universal-wrapper">
        <div className="form-wrapper">
          <div className="form-item">
            <h1>Player Profile</h1>
          </div>

          <div className="cloudinary-user">
            
            <CloudinaryUserImage 
              filename={props.user.imgName || "player_o5vlxo"}
            />

            <CloudinaryUploadWidget userId={user.currentUser.id} />
            
          </div>
          <br/>

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
                  Location: {user.status} 
                </div>
              </div>
            </div>

            <div className="errorDisplay">
              {user.error}
            </div>

            <div className="button-row">
              <button onClick={handleSubmit} type='submit' className="btn btn-theme" form="user-edit-form">Save Profile</button>

              {user.userInDatabase
              ? <><button onClick={() => {navigate("/profile")}} type='submit' className="btn btn-theme">Cancel</button>
                <button onClick={handleDelete} type='submit' className="btn btn-delete">Delete Profile</button></>
                
              : <><button type='button' className="btn btn-disabled">Cancel</button>
                <button type='button' className="btn btn-disabled">Delete Profile</button></>
              }
              
            </div>
          </form>

        </div>

      </div>
  )
}

export default UserEditor