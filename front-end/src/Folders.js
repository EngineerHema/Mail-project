import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import FolderManager from "./folderManager";




function Folders({ API_KEY, emailAddress, name }) {
    return (
        <div>
        <NavBar name={name}/>
        <div className="scrollable_flex">
        <SideBar/>
        <div className="contacts_container">
        <FolderManager API_KEY={API_KEY} emailAddress={emailAddress}/>
        </div>
      </div>

     </div>
    );
  }
  
  export default Folders;