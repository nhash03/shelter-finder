// This file contains the search bar and its form; additioally, required api requests to the server
import { useState } from "react";
import './hostPage.css';
import { Link, redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { useNavigate } from 'react-router-dom';
import Provider from "./provider";
import React from "react";

const HostPage = ({ history }) => {
  // The form has 5 required parts; first and last name, username, password and the guest query for finding the host
    const[inputText, setInputText] = useState("");
    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [personalInfo, setPersonalInfo] = useState('');
    const [placeInfo, setPlaceInfo] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToFinder, setRedirectToFinder] = useState(false);
    const navigate = useNavigate();


    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const handleCityChange = (e) => {
        setCity(e.target.value)
    };
    const handleCountryChange = (e) => {
        setCountry(e.target.value)
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    };
    const handlePersonalInfoChange = (e) => {
        setPersonalInfo(e.target.value)
    };
    const handlePlaceInfoChange = (e) => {
        setPlaceInfo(e.target.value)
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    };

    const handleSignup = async () => {
      // Making post request to sign in and add the user information to the database and 
      // redirects to the host (provider) page if the sign up was successful
    try {
      const response = await fetch('http://127.0.0.1:5001/add_host', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({'first_name': first_name, 'last_name': last_name, 
        'username': username, 'password': password, 'address': address, 'city': city, 'country': country, 'phone': phone, 'place_info': placeInfo, 'personal_info': personalInfo}),
      });

      const result = await response.json();

      if (result.success) {
        console.log(result.message);
        setRedirectToFinder(true);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };


  const handleLogin = async(e) => {
    e.preventDefault();
      // Making post request to log in and update the user information in the database and 
      // redirects to the host (provider) page if the log in was successful
    try {
      let header = {'username': usernameLogin, 'password': passwordLogin};
      const response = await fetch('http://127.0.0.1:5001/login_host', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
                              'Accept':'application/json'
        },
        body: JSON.stringify(header),      
    });

      const result = await response.json();

      if (result.success) {
        console.log(result.message);
        let best_host = usernameLogin;
        navigate('/HostProfile',  { state: { usernameLogin, best_host } })
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

    return (
        <div className="form-container">
            <label>Tell us about yourself and your place (ex. location and description):</label>
            <form onSubmit={handleLogin}>
              <input type="text" required value={first_name} placeholder="Legal First Name" onChange={handleFirstNameChange}></input>
              <input type="text" required value={last_name} placeholder="Legal Family Name" onChange={handleLastNameChange}></input>
              <input type="text" required value={country} placeholder="Country" onChange={handleCountryChange}></input>
              <input type="text" required value={city} placeholder="City" onChange={handleCityChange}></input>
              <input type="text" required value={address} placeholder="Address" onChange={handleAddressChange}></input>
              <input type="text" required value={phone} placeholder="Phone Number" onChange={handlePhoneChange}></input>
              <input type="text" required value={placeInfo} placeholder="House info." onChange={handlePlaceInfoChange}></input>
              <input type="text" required value={personalInfo} placeholder="Personal info" onChange={handlePersonalInfoChange}></input>
              <input type="text" required value={username} placeholder = 'Username' onChange={(e) => setUsername(e.target.value)} />
              <input type="password" required value={password} placeholder = 'Password' onChange={(e) => setPassword(e.target.value)} />
              
              <button onClick={handleSignup} className="orange">Sign Up</button>
            </form>
            <form onSubmit={handleLogin}>
              <input type="text" required value={usernameLogin} placeholder = 'Username' onChange={(e) => setUsernameLogin(e.target.value)} />
              <input type="password" required value={passwordLogin} placeholder = 'Password' onChange={(e) => setPasswordLogin(e.target.value)} />
              
              <button type="submit">Login</button>
            </form>
        </div>

    )
}
export default HostPage;