import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style/formSignin.css";

function LoginForm({ API_KEY, emailAddress, setName }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!email.trim()) {
      setEmailError(true);
      isValid = false;
    }
    if (password.length < 8) {
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
        navigate('/myInbox');
        emailAddress.current = email;
        alert(response.data.message);
        console.log(response.data.apiKey);
        API_KEY.current = response.data.apiKey;
        console.log(API_KEY.current + "current");
        setName(response.data.name);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
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
          <h2>Sign In</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <i>Email</i>
            </div>

            <div className="inputBox">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <i>Password</i>
            </div>

            <div className="links">
            <Link to="/register">Sign up</Link>
            </div>

            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
