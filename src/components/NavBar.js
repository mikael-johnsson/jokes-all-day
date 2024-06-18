import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png"

const NavBar = () => {
  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container>
        <Navbar.Brand><img src={logo} alt="logo" height="50" /></Navbar.Brand> {/* Update logo */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Sign Up</Nav.Link>
            <Nav.Link>Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
