import SideBar from "./Bars/SideBar";
import NavBar from "./Bars/NavBar";
import EmailPage from "./emails/EmailPage";
import { useLocation } from 'react-router-dom';
import "./style/openEmail.css"


function OpenEmail({ API_KEY, emailAddress, name }) {
    const location = useLocation();
  
    const { sender, header, body, color, receiver, time } = location.state || {};
    return (
        <div>
            <NavBar name={name}/>
            <div className="container_open_email">
                <SideBar />
                <div className="EmailPage">
                <EmailPage sender={sender} header={header} body={body} color={color} receiver={receiver} time={time}  />
                </div>
                
            </div>

        </div>
    );
  }
  
  export default OpenEmail;