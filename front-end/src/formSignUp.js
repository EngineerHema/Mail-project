import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for redirection
import axios from 'axios'; // Import axios
import "./style/formSignup.css";


function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({}); // State to track errors
  const navigate = useNavigate(); // For navigation after successful signup

  // Handle changes for each input field
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setErrors((prev) => ({ ...prev, firstName: false })); // Reset error state
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setErrors((prev) => ({ ...prev, lastName: false })); // Reset error state
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, emailAddress: false })); // Reset error state
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: false })); // Reset error state
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prev) => ({ ...prev, confirmPassword: false })); // Reset error state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!emailAddress.trim()) newErrors.emailAddress = true;
    if (password.length < 8) newErrors.password = true;
    if (password !== confirmPassword) newErrors.confirmPassword = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill out all required fields correctly.');
      return;
    }

    const userData = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    try {
      console.log(userData);

      const response = await axios.post('http://localhost:8080/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Redirect to login page on successful signup
        alert(response.data);
        navigate('/signIn'); // Redirect to the sign-in page
      } else {
        alert('Error during sign-up. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="all">
      <div className="form_section_up">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label  className='lable'>First Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={errors.firstName ? 'error' : ''}
                />
              </Col>
              <Col>
                <Form.Label  className='lable'>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className={errors.lastName ? 'error' : ''}
                />
              </Col>
            </Row>
          </Form.Group>

          <p></p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label  className='lable'>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={emailAddress}
              onChange={handleEmailChange}
              className={errors.emailAddress ? 'error' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label  className='lable'>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? 'error' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label  className='lable'>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
          </Form.Group>

          <Form.Group>
            <Link to="/signIn" className="already_have">
              Already have an account?
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

export default SignUpForm;
