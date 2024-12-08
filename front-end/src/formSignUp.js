import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for redirection
import axios from 'axios'; // Import axios
import './formSignup.css';

function SignUpForm() {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate(); // For navigation after successful signup

  // Handle changes for each input field
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (optional but recommended)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    try {
      console.log(userData)

      const response = await axios.post('http://localhost:8080/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Redirect to login page on successful signup
        alert(response.data);
        navigate('/signIn');  // Redirect to the sign-in page
      } else {
        alert('Error during sign-up. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='all'>
      <div className='form_section_up'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  placeholder="First name" 
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  placeholder="Last name" 
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <p></p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={emailAddress}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>

          <Form.Group>
            <Link to="/signIn" className='already_have'>
              Already have an account?
            </Link>
          </Form.Group>

          <Button variant="primary" type="submit" className='button-submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;
