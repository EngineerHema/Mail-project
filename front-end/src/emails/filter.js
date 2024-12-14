import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../style/filterlist.css"

function FilterList() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className='filter_list'>
      <Container fluid>
        <Navbar.Brand href="#home">Sort By :</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark" className='list'>
              <NavDropdown.Item href="#action/3.1">Time old to new</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Time new to old</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">priority high to low</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">priority low to high</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterList;