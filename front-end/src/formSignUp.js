import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // Import axios
import "./style/formSignup.css";

function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

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
    e.preventDefault(); // Prevent default form submission behavior (page reload)

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
    console.log(userData)

    try {
      const response = await axios.post('http://localhost:8080/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert(response.data); 
        navigate('/signIn');
      } else {
        alert('Error during sign-up. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <section>
      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}
      <div className="signin">
        <div className="content">
          <h2>Sign UP</h2>
          <form className="form" onSubmit={handleSubmit}> {/* Attach onSubmit here */}
            <div className="inputRow">
              <div className="inputBox">
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
                <i>First Name</i>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
                <i>Last Name</i>
              </div>
            </div>

            {/* Email input */}
            <div className="inputBox">
              <input
                type="email"
                value={emailAddress}
                onChange={handleEmailChange}
                required
              />
              <i>Email</i>
            </div>

            {/* Password input */}
            <div className="inputBox">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <i>Password</i>
            </div>

            {/* Confirm Password input */}
            <div className="inputBox">
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <i>Confirm Password</i>
            </div>

            {/* Link to SignIn */}
            <div className="links">
              <Link to="/signIn">Sign In</Link>
            </div>

            {/* Submit button */}
            <div className="inputBox">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
