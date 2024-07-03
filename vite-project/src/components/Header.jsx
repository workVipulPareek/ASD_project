import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import IMG from '../images/larussoAuto.png';
import { isLoggedIn, logout, isAdmin } from '../../../server/authUtil'; // Assuming you have a function to check if user is admin

const Header = () => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());
  const [admin, setAdmin] = useState(false); // State to track if user is admin
  const navigate = useNavigate();

  useEffect(() => {
    setAuthenticated(isLoggedIn());
    setAdmin(isAdmin()); // Check if user is admin
  }, []);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setAdmin(false); // Reset admin state
    localStorage.removeItem('roles'); // Clear roles from localStorage
    localStorage.removeItem('token'); // Clear roles from localStorage

    axios.get('http://localhost:4000/Logout')
      .then(response => {
        navigate('/Home');
      })
      .catch(error => {
        console.error("Logout error:", error);
        // Handle logout error
      });
  };

  const isAdmin = () => {
    const storedRoles = localStorage.getItem('roles');
    const roles = storedRoles ? JSON.parse(storedRoles) : [];
    return roles.includes('admin');
  };


  return (
    <ChakraProvider>
      <Navbar className='header' bg="dark" sticky="top" expand="lg" variant="dark">
        <Container fluid>
          <a href='/Home'>
            <div className='logo-image'>
              <img width="250px" src={IMG} alt="Logo" />
            </div>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {admin ?
                <>
                  <Nav.Link href="/AdminUser" className="fs-3"> Users </Nav.Link>
                  <Nav.Link href="/AdminSell" className="fs-3"> SellRequests </Nav.Link>
                  <Nav.Link href="/AdminBuy" className="fs-3"> Inventory </Nav.Link>
                  <Nav.Link href="/AdminServices" className="fs-3"> ServiceRequests </Nav.Link>
                </>
                : (
                  <>
                    <Nav.Link href="/Home" className="fs-3">Home</Nav.Link>
                    <Nav.Link href="/Buy" className="fs-3">Buy</Nav.Link>
                    <Nav.Link href="/Sell" className="fs-3">Sell</Nav.Link>
                    <Nav.Link href="/Services" className="fs-3">Services</Nav.Link>
                    {authenticated ? (
                      <Nav.Link href="/UserProfile" className="fs-3">Profile</Nav.Link>
                    ) : (

                      <Nav.Link href="/AboutUs" className="fs-3">AboutUs</Nav.Link>
                    )}
                  </>
                )}
            </Nav>
            {authenticated ? (
              <Button onClick={handleLogout} colorScheme="red" variant='solid' size='lg' m={5} p={5}>Logout</Button>
            ) : (
              <Button as={RouterLink} to="/LoginForm" colorScheme="teal" variant='solid' size='lg' m={5} p={5}>Login</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ChakraProvider>
  );
};

export default Header;
