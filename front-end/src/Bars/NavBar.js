import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import "../style/NavBar.css";


function NavBar({name}) {
  console.log(name+" name")



  // Refresh button action
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSignOut = () => {
    console.log('signed Out successfully');
  };

  return (
    <Navbar className="NavBar d-flex">
      <Navbar.Text className="NavBarText">
        Signed in as: <span>{name}</span>

      </Navbar.Text>
      <div>
      <button 
        className="NavBarButton1 btn btn-outline-light" 
        onClick={handleRefresh}>
        Refresh
      </button>

      <button 
        className="NavBarButton2 btn btn-outline-light" 
        onClick={handleSignOut}>
        Sign Out
      </button>
      </div>
    </Navbar>
  );
}

export default NavBar;
