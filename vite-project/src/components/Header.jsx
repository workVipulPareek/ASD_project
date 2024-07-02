import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import IMG from '../images/larussoAuto.png';
import { isLoggedIn, logout} from '../../server/authUtil';

const Header = () => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setAuthenticated(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    axios.get('http://localhost:5000/Logout') // Logout endpoint
      .then(response => {
        // logout(); // Call logout function from AuthContext
        navigate('/Home'); // Redirect to home or login page
      })
      .catch(error => {
        console.error("Logout error:", error);
        // Handle logout error
      });
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
              <Nav.Link href="/Home" className="fs-3">Home</Nav.Link>
              <Nav.Link href="/Buy" className="fs-3">Buy</Nav.Link>
              <Nav.Link href="/Sell" className="fs-3">Sell</Nav.Link>
              <Nav.Link href="/Services" className="fs-3">Services</Nav.Link>
              <Nav.Link href="/AboutUs" className="fs-3">About Us</Nav.Link>
            </Nav>
              {authenticated ?(
                <Button onClick={handleLogout} colorScheme="red" variant='solid' size='lg' m={5} p={5}>Logout</Button>
              ) : (
                <Button as={RouterLink} to="/LoginForm" colorScheme="teal" variant='solid' size='lg' m={5} p={5}>Login</Button>
              ) }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ChakraProvider>
  );
};

export default Header;
