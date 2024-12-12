import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import "../style/NavBar.css";


function NavBar({name}) {
  console.log(name+" name")



  // Refresh button action
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Navbar className="NavBar d-flex">
      <Navbar.Text className="NavBarText">
        Signed in as: <span>{name}</span>

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
