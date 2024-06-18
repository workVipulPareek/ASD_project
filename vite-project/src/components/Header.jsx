import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import IMG from '../images/larussoAuto.png';

const BasicExample = () => {
  return (
      <Navbar className='header' bg = "dark" sticky="top" expand="lg"  variant="dark">
        <Container fluid >
          <a className='navbar-brand' href='/Sell'>
            <div className='logo-image'>
              <img src= {IMG} class = "img-fluid">
              </img>
            </div>
          </a>
          {/* <Navbar.Brand href="#home" className="navbar-brand-company-name">LaRusso Auto Group</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/" className="fs-3">Home</Nav.Link>
              <Nav.Link href="/Buy" className="fs-3">Buy</Nav.Link>
              <Nav.Link href="/Sell" className="fs-3">Sell</Nav.Link>
              <Nav.Link href="/Services" className="fs-3">Services</Nav.Link>
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
