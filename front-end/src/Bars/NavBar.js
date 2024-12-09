import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import "../style/NavBar.css";


function NavBar() {
  const [UserName, setUserName] = useState('hamada');
  return (
    
    <Navbar className="NavBar">
      <Navbar.Text className = 'NavBarText'>
            Signed in as: <a>{UserName}</a >
          </Navbar.Text>
         
       
          
    </Navbar>
  );
}

export default NavBar;