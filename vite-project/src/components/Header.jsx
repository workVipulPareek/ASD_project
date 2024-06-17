import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const BasicExample = () => {
  return (
      <Navbar className='header' bg = "dark" sticky="top" expand="lg"  variant="dark">
        <Container fluid >
          <Navbar.Brand href="#home" className="navbar-brand-company-name">Larusso Motors</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#home" className="fs-3">Home</Nav.Link>
              <Nav.Link href="#link" className="fs-3">Link</Nav.Link>
              <Nav.Link href="#link" className="fs-3">Link</Nav.Link>
              <Nav.Link href="#link" className="fs-3">Link</Nav.Link>
              <Nav.Link href="#link" className="fs-3">Link</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#signin" className="btn btn-light ms-5 fs-3">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default BasicExample;
