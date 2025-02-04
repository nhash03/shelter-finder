// This is a sample page that will use the user's query in order to make a sample host that matches the guest's needs
import React, { useState, useEffect } from "react"
import Popup from "./popup"
import "./host.css"
import { useLocation } from "react-router-dom"

const Provider = () => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [data, setData] = useState(null);
    const location = useLocation();
    const { headers } = location.state || {};


    useEffect(() => {
    const fetchData = async () => {
      // Before the component is completely loaded, the GET request will asynchronously fetch the user query and info 
      try {
        console.log(`location data ${location.state?.data}`)
        const response = await fetch('http://localhost:5001/signed_user_data', {
          method: 'POST',  
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({username: location.state?.usernameLogin })
        });

        let data = await response.json();
        data =JSON.parse(data.data);
        console.log(`response ${data}`)
        if (response.ok) {
          setData(location.state?.best_host);
          console.log('Data fetched successfully:', data.data);
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [location.state]); 

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
    {data &&(
    <div>
    <div className="Header">
            <h1>We found the perfect Home for you!</h1>
            </div>
            <div className="box">
            <div className="upper-container">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80" alt='' height= "100px" width="100px"/>
                <h3>{data[1]}</h3>
            </div>
            <div className="lower-container">
                <h4>{data[8] + ', ' + data[11]}</h4>
                <p>{data[12]}</p>
                <button onClick={handleClick}>Notify Host</button>
                <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                    <h3 className="label">Sent the request successfully!</h3>
                </Popup>
            </div>
            </div>
            </div>
            )}
        </div>
    );
}
export default Provider;
