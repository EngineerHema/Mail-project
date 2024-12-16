import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function SortList({ sortMethod }) {
  const [Method, setMethod] = useState("PriorityHighToLow");

  const handleSelect = (method) => {
    console.log(method)
    sortMethod.current=method;
    setMethod(method)
    if(sortMethod?.current === null || sortMethod?.current === undefined){
    sortMethod.current="PriorityHighToLow";
    }
  };

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className='filter_list'>
      
      
            <NavDropdown
              id="nav-dropdown-dark-example"
              title= {Method}
              menuVariant="dark"
              className='list'
            >
              <NavDropdown.Item onClick={() => handleSelect("Time Old To New")}>
                Time old to new
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect("Time New To Old")}>
                Time new to old
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect("Priority High To Low")}>
                Priority high to low
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect("Priority Low To High")}>
                Priority low to high
              </NavDropdown.Item>
            </NavDropdown>
    </Navbar>
  );
}

export default SortList;