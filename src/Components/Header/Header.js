import React from "react";
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import './style.css'

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">AI Playground</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="Header" id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="">Learn AI</Nav.Link>
            <Nav.Link href="#link">Docs</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
