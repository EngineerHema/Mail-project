import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import ScrollableContainer from './ScrollableContainer';
import './Scrollablecontainer.css'; 

function Inbox() {
    return (
     <div>
      
        <NavBar></NavBar>
        <div className="scrollable_flex">
        <SideBar></SideBar>
        <ScrollableContainer/>
      </div>
     </div>
    );
  }
  
  export default Inbox;