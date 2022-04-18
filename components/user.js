import React, {useState} from 'react'


function User() {
    const [ user, setUser ] = useState({
        firstName: "",
        lastName: "",
        derbyName: "",
        jerseyNumber: "",
        age: "",
        email: "",
        phone: "",
        gender: "",
        location: "",
        showForm: false
    })

    const toggleForm = () => {
      
      setUser(previousState => {
        return { ...previousState, showForm: !previousState.showForm}
      })
    }


  return (
    <div>
        <h1>Current Information</h1>
        {user.derbyName} ({user.firstName} {user.lastName})
        {user.age} years old
        {user.gender}
        {user.email}
        {user.phone}
        {user.location}

    <button onClick={toggleForm}>Update User Profile</button>

    </div>
  )
}

export default User