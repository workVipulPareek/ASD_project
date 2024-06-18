import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ChakraProvider, Button } from '@chakra-ui/react';
import IMG from '../images/larussoAuto.png';

const BasicExample = () => {
  return (
    <ChakraProvider>
      <Navbar className='header' bg="dark" sticky="top" expand="lg" variant="dark">
        <Container fluid>
          <a className='navbar-brand' href='/'>
            <div className='logo-image'>
              <img src={IMG} className="img-fluid" alt="Logo" />
            </div>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/" className="fs-3">Home</Nav.Link>
              <Nav.Link href="/Buy" className="fs-3">Buy</Nav.Link>
              <Nav.Link href="/Sell" className="fs-3">Sell</Nav.Link>
              <Nav.Link href="/Services" className="fs-3">Services</Nav.Link>
            </Nav>
            <Button colorScheme="whiteAlpha" variant= 'solid' size='lg' m={5} p={5}>Sign In</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ChakraProvider>
  );
};

export default BasicExample;
