import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import React, { useState } from 'react';
function Sent({ API_KEY, emailAddress, name }) {
    return (
     <div>
        <NavBar name={name}></NavBar>
        <SideBar></SideBar>
     </div>
    );
  }
  
  export default Sent;