import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import ScrollableContainer from "./emails/ScrollableContainer";
import './style/Scrollablecontainer.css';



function Inbox({ API_KEY, emailAddress, name}) {
    return (
     <div>
        <NavBar name={name}/>
        <div className="scrollable_flex">
        <SideBar/>
        
        <ScrollableContainer API_KEY={API_KEY} Address={emailAddress} type={"inbox"}/>
      </div>
     </div>
    );
  }
  
  export default Inbox;