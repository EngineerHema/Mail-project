import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './formSignIn';
import SignUpForm from './formSignUp';
import Inbox from './inbox';
import ComposeEmail from './composeEmail';
import Trash from './trash';
import Contacts from './contacts';
import Sent from './sent';
import OpenEmail from './openEmail';
import Folders from './Folders';
import FolderPage from './folderPage';



function App() {
  const API_KEY = useRef(null);
  const emailAddress = useRef(null);
  const [name, setName] = useState(null);



  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<Navigate to="/signIn" />} />    

        <Route path="/signIn" element={<LoginForm API_KEY = {API_KEY} emailAddress={emailAddress} setName={setName}/>} />
             
        <Route path="/register" element={<SignUpForm/>} />

        <Route path="/myInbox" element={<Inbox API_KEY = {API_KEY} emailAddress={emailAddress} name={name} />} />
        
        <Route path="/myComposeEmail" element={<ComposeEmail API_KEY = {API_KEY} emailAddress={emailAddress} name={name}/>} />

        <Route path="/mySent" element={<Sent API_KEY = {API_KEY} emailAddress={emailAddress} name={name} />} />

        <Route path="/myTrash" element={<Trash API_KEY = {API_KEY} emailAddress={emailAddress} name={name} />} />

        <Route path="/openEmail" element={<OpenEmail API_KEY = {API_KEY} emailAddress={emailAddress} name={name} />} />

        <Route path="/myContacts" element={<Contacts API_KEY = {API_KEY} emailAddress={emailAddress} name={name}/>} />

        <Route path="/Folders" element={<Folders API_KEY = {API_KEY} emailAddress={emailAddress} name={name}/>} />
        <Route path="/folderPage" element={<FolderPage API_KEY = {API_KEY} emailAddress={emailAddress} name={name}/>} />


      </Routes>
    </Router>
  );
}

export default App;
