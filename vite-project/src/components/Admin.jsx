// src/components/Admin.jsx
import React from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { Link as RouterLink, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SellData from './sellData';
import UsersData from './usersData';
import Inventory from './Inventory';

import { isLoggedIn, logout } from '../../server/authUtil';

const Admin = ({showHeader = false}) => {
  const authenticated = isLoggedIn();

  const handleLogout = () => {
    logout();
    // Redirect or handle logout logic as needed
  };

  return (
    <ChakraProvider>
      {showHeader && (
        <Navbar className='header' bg="dark" sticky="top" expand="lg" variant="dark">
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link as={RouterLink} to="/SellData" className="fs-3">Sell Data</Nav.Link>
                <Nav.Link as={RouterLink} to="/UsersData" className="fs-3">Users Data</Nav.Link>
                <Nav.Link as={RouterLink} to="/Inventory" className="fs-3">Stock in Inventory</Nav.Link>
              </Nav>
              {authenticated ? (
                <Button onClick={handleLogout} colorScheme="teal" variant='solid' size='lg' m={5} p={5}>Logout</Button>
              ) : (
                <Button as={RouterLink} to="/LoginForm" colorScheme="teal" variant='solid' size='lg' m={5} p={5}>Login</Button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </ChakraProvider>
  );
};

export default Admin;