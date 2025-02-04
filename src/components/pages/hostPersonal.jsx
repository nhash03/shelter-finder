// This is a sample page that will use the user's query in order to make a sample host that matches the guest's needs
import React, { useState, useEffect } from "react"
import Popup from "./popup"
import "./host.css"
import { useLocation } from "react-router-dom"

const HostProfile = () => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [userData, setUserData] = useState(new Map()); // State to store API response
    const location = useLocation();
    const usernameLogin = location.state?.usernameLogin; 
    const [error, setError] = useState(null); // State to store any error messages

    const { headers } = location.state || {};

     useEffect(() => {
    if (!usernameLogin) return; // Exit if usernameLogin is not provided

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/signed_user_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: location.state?.usernameLogin, isHost:true }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setUserData(data.data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Capture any error messages
      }
    };

    fetchData();
    console.log(userData)
  }, [usernameLogin]);
    const handleClick = async () => {
      // when the guest clicks on 'Notify Host' button, the server will connect to the twilio api to 
      // provide a secure communication to the host
        try {
    const response = await fetch('http://localhost:5001/connection_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: location.state?.username }), // Send username for twilio API
    });

    if (response.ok) {
      setButtonPopup(true); // Correctly set state to boolean
      console.log('Request sent successfully');
    } else {
      console.error('Failed to notify host');
    }
  } catch (error) {
    console.error('Error notifying host:', error);
  }

    }

    return(
        <div className="Host">
    {userData.length === 0 ? (
        <p>Loading your data...</p>
      ) : ( 
    <div>
    <div className="Header">
            <h1>Welcome Back</h1>
            </div>
            <div className="box">
            <div className="upper-container">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80" alt='' height= "100px" width="100px"/>
                <h3>{userData['username']}</h3>
            </div>
            <div className="lower-container">
                <h4>{userData['city'] + ', ' + userData['country']}</h4>
                <p>{userData['additional']}</p>
                <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                    <h3 className="label">Sent the request successfully!</h3>
                </Popup>
            </div>
            </div>
            </div>
            // )
            )}
        </div>
    );
}
export default HostProfile;
