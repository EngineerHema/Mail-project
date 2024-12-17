import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import ContactService from "./ContactService"
import './style/Contacts.css';




function Inbox({ API_KEY, emailAddress, name }) {
    return (
     <div>
        <NavBar name={name}/>
        <div className="scrollable_flex">
        <SideBar/>
        <div className="contacts_container">
        <ContactService API_KEY={API_KEY} emailAddress={emailAddress}/>
        </div>
      </div>

     </div>
    );
  }
  
  export default Inbox;