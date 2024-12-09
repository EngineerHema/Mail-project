import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './formSignIn';
import SignUpForm from './formSignUp';
import Inbox from './inbox';
import ComposeEmail from './composeEmail';
import Trash from './trash';
import Contacts from './contacts';
import Sent from './sent';



function App() {

  const [API_KEY, setAPI_KEY] = useState(null);

  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Navigate to="/signIn" />} />   
        
        <Route path="/signIn" element={<LoginForm setAPI_KEY = {setAPI_KEY}/>} />
             
        <Route path="/register" element={<SignUpForm />} />

        <Route path="/myInbox" element={<Inbox/>} />
        
        <Route path="/myComposeEmail" element={<ComposeEmail/>} />

        <Route path="/mySent" element={<Sent/>} />

        <Route path="/myTrash" element={<Trash/>} />

        <Route path="/myContacts" element={<Contacts/>} />


       

      </Routes>
    </Router>
  );
}

export default App;
