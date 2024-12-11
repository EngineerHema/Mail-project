import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import EmailForm from "./composeEmail/EmailForm";
import "./style/composeEmail.css"
function ComposeEmail() {
    return (
     <div>
        <NavBar></NavBar>
        <div className="container_composeEmail">
        <SideBar></SideBar>
        <EmailForm></EmailForm>
        </div>
        
     </div>
    );
  }
  
  export default ComposeEmail;