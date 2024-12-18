import Navbar from 'react-bootstrap/Navbar';
import "../style/NavBar.css";
import { useNavigate } from 'react-router-dom';



function NavBar({name}) {
  console.log(name+" name")
  const navigate = useNavigate();





  // Refresh button action
  const handleRefresh = () => {
   
  };

  const handleSignOut = () => {
    navigate('/');
    console.log('signed Out successfully');
  };

  return (
    <Navbar className="NavBar d-flex">
      <Navbar.Text className="NavBarText">
        Signed in as: <span>{name}</span>

      </Navbar.Text>
      <div>
      <button 
        className="NavBarButton1 btn btn-outline-light" 
        onClick={handleRefresh}>
        Refresh
      </button>

      <button 
        className="NavBarButton2 btn btn-outline-light" 
        onClick={handleSignOut}>
        Sign Out
      </button>
      </div>
    </Navbar>
  );
}

export default NavBar;
