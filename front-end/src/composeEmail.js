import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import EmailForm from "./composeEmail/EmailForm";
import "./style/composeEmail.css"
function ComposeEmail({ API_KEY, emailAddress, name}) {
    return (
     <div>
        <NavBar name={name}></NavBar>
        <div className="container_composeEmail">
        <SideBar></SideBar>
        <EmailForm API_KEY={API_KEY} emailAddress={emailAddress} ></EmailForm>
        </div>
        
     </div>
    );
  }
  
  export default ComposeEmail;