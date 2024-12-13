import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";

function Contacts({ API_KEY, emailAddress, name }) {
    return (
     <div>
        <NavBar name={name}></NavBar>
        <SideBar></SideBar>
     </div>
    );
  }
  
  export default Contacts;