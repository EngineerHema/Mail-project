import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import ScrollableContainer from "./emails/ScrollableContainer";
import './style/Scrollablecontainer.css';
import { useLocation } from 'react-router-dom';




function FolderPage({ API_KEY, emailAddress, name}) {
    const location = useLocation();
    const { folder } = location.state || {};
    
        return (
     <div>
        <NavBar name={name}/>
        <div className="scrollable_flex">
        <SideBar/>
        
        <ScrollableContainer API_KEY={API_KEY} Address={emailAddress} type={folder}/>
      </div>
     </div>
    );
  }
  
  export default FolderPage;