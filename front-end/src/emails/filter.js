import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../style/filterlist.css"

function FilterList({ sortMethod }) {
  const handleSelect = (method) => {
    sortMethod.current=method;
    
    if(sortMethod?.current === null || sortMethod?.current === undefined){
    sortMethod.current="PriorityHighToLow";
    }
  };

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className='filter_list'>
      <Container fluid>
        <Navbar.Brand href="#home">Sort By :</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title= {sortMethod?.current || "PriorityHighToLow"}
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterList;
