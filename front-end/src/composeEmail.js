import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import EmailForm from "./composeEmail/EmailForm";
import { useLocation } from "react-router-dom";
import "./style/composeEmail.css"

function ComposeEmail({ API_KEY, emailAddress, name}) {
   const location = useLocation(); // Access state from Link
   const { sender, header, body, color, receiver, time, attachments ,singleAddressDraft,toAddressDraft} = location.state || {}; 
 
    return (
     <div>
        
        <NavBar name={name}></NavBar>
        <div className="container_composeEmail">
        <SideBar/>
        <EmailForm API_KEY={API_KEY} emailAddress={emailAddress}  header={header} body={body} color={color} receiver = {receiver}  attachments={attachments} singleAddressDraft={singleAddressDraft}toAddressDraft={toAddressDraft}></EmailForm>
        </div>
        
     </div>
    );
  }
  
  export default ComposeEmail;