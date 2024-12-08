import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './formSignIn';
import SignUpForm from './formSignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const [API_KEY, setAPI_KEY] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Redirect from root path to /signIn */}
        <Route path="/" element={<Navigate to="/signIn" />} />
        
        {/* Sign In page */}
        <Route path="/signIn" element={<LoginForm setAPI_KEY = {setAPI_KEY}/>} />
        
        {/* Sign Up page */}
        <Route path="/register" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
