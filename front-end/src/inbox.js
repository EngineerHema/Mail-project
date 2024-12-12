import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import ScrollableContainer from "./emails/ScrollableContainer";



function Inbox({ API_KEY, emailAddress, name }) {
    return (
     <div>
        <NavBar name={name}/>
        <div className="scrollable_flex">
        <SideBar/>
        <ScrollableContainer/>
      </div>
     </div>
    );
  }
  
  export default Inbox;