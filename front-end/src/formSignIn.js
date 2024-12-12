import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate here
import axios from 'axios'; // Import Axios
import "./style/formSignin.css";


function LoginForm({ API_KEY, emailAddress ,setName}) {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // State for email error
  const [passwordError, setPasswordError] = useState(false); // State for password error
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); // Reset error state on change
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false); // Reset error state on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if fields are empty
    let isValid = true;
    if (!email.trim()) {
      setEmailError(true);
      isValid = false;
    }
    if (password.length<8) {
      setPasswordError(true);
      isValid = false;
    }
    

    if (!isValid) {
      alert('Please fill out all required fields.');
      return;
    }

    const loginData = {
      emailAddress: email,
      password: password,
    };

    try {
      console.log(loginData);
      const response = await axios.post('http://localhost:8080/signIn', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // On successful login, redirect to another page, e.g., dashboard or home
        emailAddress.current = email
        navigate('/myInbox'); 
        alert(response.data.message);
        console.log(response.data.apiKey);
        API_KEY.current = response.data.apiKey;
        console.log(API_KEY.current + "current");
        setName(response.data.name);

      //  navigate('/myprofile'); // Replace with the desired route /// hemaaa fok el coment lma t4t8l
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
    <div className="all">
      <div className="form_section_in">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label  className='lable'>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange} // Update state on change
              className={emailError ? 'error' : ''} // Add 'error' class if emailError is true
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='lable'>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange} // Update state on change
              className={passwordError ? 'error' : ''} // Add 'error' class if passwordError is true
            />
          </Form.Group>

          <Form.Group>
            <Link to="/register" className="dont_have">
              Do not have an account?
            </Link>
          </Form.Group>

          <Button variant="primary" type="submit" className="button-submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
