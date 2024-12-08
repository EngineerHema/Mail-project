import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate here
import axios from 'axios'; // Import Axios
import './formSignin.css';

function LoginForm({setAPI_KEY}) {
  // State for form fields
  setAPI_KEY(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const loginData = {
      emailAddress: email,
      password: password,
    };

    try {
      console.log(loginData)
      const response = await axios.post('http://localhost:8080/signIn', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // On successful login, redirect to another page, e.g., dashboard or home
        alert(response.data.message);
        console.log(response.data);
        setAPI_KEY(response.data.apiKey);
        

        navigate('/dashboard');  // Replace with the desired route
      } else {
        // Handle error (e.g., invalid credentials)
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='all'>
      <div className='form_section_in'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={handleEmailChange} // Update state on change
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={handlePasswordChange} // Update state on change
            />
          </Form.Group>

          <Form.Group>
            <Link to="/register" className='dont_have'>Do not have an account?</Link>
          </Form.Group>

          <Button variant="primary" type="submit" className='button-submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
