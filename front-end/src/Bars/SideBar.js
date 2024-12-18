import Nav from 'react-bootstrap/Nav';
import "../style/SideBar.css";

import { NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <div className="SideBarAll">
      <Nav className="flex-column">
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          to="/myInbox"
        >
          InBox
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          to="/mySent"
        >
          Sent
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          to="/myTrash"
        >
          Trash
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          to="/myContacts"
        >
          Contacts
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          to="/myComposeEmail"
        >
          Compose Email
        </NavLink>

        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          to="/Folders"
        >
          Folders
        </NavLink>
      </Nav>
    </div>
  );
}

export default SideBar;
