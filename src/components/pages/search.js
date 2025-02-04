// This file contains the search bar and its form; additioally, required api requests to the server
import { useState } from "react";
import './search.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from "react-bootstrap/esm/FormGroup";
import React from "react";


const Search = ({ history }) => {
  // The form has 5 required parts; first and last name, username, password and the guest query for finding the host
    const[inputText, setInputText] = useState("");
    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');


    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [redirectToFinder, setRedirectToFinder] = useState(false);
    const navigate = useNavigate();



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
      const response = await fetch('http://127.0.0.1:5001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({'user_query': inputText, 'first_name': first_name, 'last_name': last_name, 
        'username': username, 'password': password, 'city': city, 'country':country}),
      });

      const result = await response.json();
      const best_host = await result.data;

      if (result.success) {
        console.log(result.message);
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
      const response = await fetch('http://127.0.0.1:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
                              'Accept':'application/json'
        },
        body: JSON.stringify(header),      
    });

      const result = await response.json();
      const best_host = await result.data;
      console.log(result)
      if (result.success) {
        console.log(result.message);
        navigate('/Finder',  { state: { usernameLogin, best_host } })
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

    return (
          <div className="form-container">
        <Form.Label>Tell us about your situation (ex. location and your companions):</Form.Label>
            <Form >
            <Form.Control type="text" required value={first_name} placeholder="Legal First Name" onChange={handleFirstNameChange} />
            <Form.Control type="text" required value={last_name} placeholder="Legal Family Name" onChange={handleLastNameChange} />
            <Form.Control type="text" required value={username} placeholder = 'Username' onChange={(e) => setUsername(e.target.value)} />
            <Form.Control type="password" size="lg" required value={password} placeholder = 'Password' onChange={(e) => setPassword(e.target.value)} />
            <Form.Control type="text" required value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} id= "txt" />
            <Form.Control type="text" required value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} id= "txt" />
            <Form.Control type="text" required value={inputText} placeholder="Description of situation" onChange={handleInputChange} id= "txt" />
            <Button onClick={handleSignup} className="orange">Sign Up</Button>
            </Form> 
        <Form.Label>Tell us about your situation (ex. location and your companions):</Form.Label>
            <Form onSubmit={handleLogin}>
            <Form.Control type="text" required value={usernameLogin} placeholder = 'Username' onChange={(e) => setUsernameLogin(e.target.value)} />
            <Form.Control type="password" required value={passwordLogin} placeholder = 'Password' onChange={(e) => setPasswordLogin(e.target.value)} />
            <Button type="submit">Login</Button>
            </Form> 
    </div>
    )
}
export default Search;