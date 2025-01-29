import React from "react";

export default function User(props) {
  const handleDelete = async (user) => {
    const response = await fetch('https://ink-and-wandeev2-be.onrender.com/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: props.user
      })
    })

    const data = await response.json()

    if(data.error){
      alert('Failed to delete user.')
    } else {
      alert('User has been successfully deleted.')
      window.location.reload()
    }
  }


  return (
    <div className="userCard">
      <h3>{props.name}</h3>
      <p>Email: {props.email}</p>
      <p>Role: {props.role}</p>
      {props.role == 'User' ? (<button className="deleteButton" onClick={() => handleDelete(props.user)}>
        Delete User
      </button>) : <></>}
      
    </div>
  );
}
