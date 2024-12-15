import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import ContactService from "./ContactService"
import './style/Contacts.css';
import FilterList from './emails/filter';



function Inbox({ API_KEY, emailAddress, name }) {
    return (
     <div>
        <NavBar name={name}/>
        <div className="scrollable_flex">
        <SideBar/>
        <div className="contacts_container">
        <FilterList/>
        <ContactService/>
        </div>
      </div>

     </div>
    );
  }
  
  export default Inbox;