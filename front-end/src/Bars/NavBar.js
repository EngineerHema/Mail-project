import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import "../style/NavBar.css";

function NavBar() {
  const [UserName, setUserName] = useState('hamada');

  // Refresh button action
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Navbar className="NavBar d-flex">
      <Navbar.Text className="NavBarText">
        Signed in as: <span>{UserName}</span>
      </Navbar.Text>
      <button 
        className="NavBarButton btn btn-outline-light" 
        onClick={handleRefresh}>
        Refresh
      </button>
    </Navbar>
  );
}

export default NavBar;
