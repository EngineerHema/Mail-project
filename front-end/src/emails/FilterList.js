import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';


function FilterList({ FilterMethod }) {
  const [Method, setMethod] = useState("Filter Method");
  const handleSelect = (method) => {
    FilterMethod.current=method;
    setMethod(method)
    if(FilterMethod?.current === null || FilterMethod?.current === undefined){
        FilterMethod.current="All";
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
                <NavDropdown.Item onClick={() => handleSelect("All")}>
              All
              </NavDropdown.Item>    
              <NavDropdown.Item onClick={() => handleSelect("Head")}>
              Head
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect("Body")}>
              Body
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect("Attachment")}>
              Attachment
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect("Sender")}>
              Sender
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect("Receiver")}>
              Receiver
              </NavDropdown.Item>
            </NavDropdown>
    </Navbar>
  );
}

export default FilterList;