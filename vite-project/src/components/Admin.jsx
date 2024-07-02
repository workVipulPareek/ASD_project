import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, List, ListItem, Text, Flex, Button, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { isLoggedIn, logout } from '../../server/authUtil';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Admin = ({ showHeader = false }) => {
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
      <div className='main-body'>
        <Box p={5}>
          <Heading as="h1" size="xl" mb={5} textAlign="center" fontWeight="extrabold">Admin Panel</Heading>
          <Tabs variant="enclosed" size="lg">
            <TabList>
              <Tab _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} bg="lightblue" color="white" fontWeight="bold" _hover={{ bg: 'blue.300' }}>User Info</Tab>
              <Tab _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} bg="lightblue" color="white" fontWeight="bold" _hover={{ bg: 'blue.300' }}>Services Request</Tab>
              <Tab _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} bg="lightblue" color="white" fontWeight="bold" _hover={{ bg: 'blue.300' }}>Sell Info</Tab>
              <Tab _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} bg="lightblue" color="white" fontWeight="bold" _hover={{ bg: 'blue.300' }}>Buy Info</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserInfo />
              </TabPanel>
              <TabPanel>
                <ServiceRequest />
              </TabPanel>
              <TabPanel>
                <SellInfo />
              </TabPanel>
              <TabPanel>
                <BuyInfo />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    </ChakraProvider>
  );
};

const UserInfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.log('Error fetching users:', error);
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.log('Error deleting user:', error);
      });
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>User Info</Heading>
      <List spacing={5}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontSize="lg"><strong>Name:</strong> {user.name}</Text>
                  <Text fontSize="lg"><strong>Email:</strong> {user.email}</Text>
                  <Text fontSize="lg"><strong>Role:</strong> {user.role}</Text>
                </Box>
                <Button colorScheme="red" onClick={() => deleteUser(user.id)}>Delete</Button>
              </Flex>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/service-requests')
      .then(response => {
        if (Array.isArray(response.data)) {
          setRequests(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.log('Error fetching service requests:', error);
      });
  }, []);

  const deleteRequest = (id) => {
    axios.delete(`http://localhost:3000/service-requests/${id}`)
      .then(response => {
        setRequests(requests.filter(request => request.id !== id));
      })
      .catch(error => {
        console.log('Error deleting request:', error);
      });
  };

  const forwardRequest = (id) => {
    alert(`Service request ${id} forwarded.`);
  };

  const pendingRequests = requests.filter(request => request.status === 'Pending').length;
  const completedRequests = requests.filter(request => request.status === 'Completed').length;

  const data = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        data: [pendingRequests, completedRequests],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Services Request</Heading>
      <Pie data={data} />
      <List spacing={5} mt={5}>
        {requests.map((request) => (
          <ListItem key={request.id}>
            <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontSize="lg"><strong>Name:</strong> {request.name}</Text>
                  <Text fontSize="lg"><strong>Service:</strong> {request.service}</Text>
                  <Text fontSize="lg"><strong>Status:</strong> {request.status}</Text>
                </Box>
                <Box>
                  <Button colorScheme="blue" mr={2} onClick={() => forwardRequest(request.id)}>Forward</Button>
                  <Button colorScheme="red" onClick={() => deleteRequest(request.id)}>Delete</Button>
                </Box>
              </Flex>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
const SellInfo = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/sales')
      .then(response => {
        if (Array.isArray(response.data)) {
          setSales(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.log('Error fetching sales:', error);
      });
  }, []);

  const soldItems = sales.filter(sale => sale.status === 'Sold').length;
  const pendingItems = sales.filter(sale => sale.status === 'Pending').length;

  const data = {
    labels: ['Sold', 'Pending'],
    datasets: [
      {
        label: 'Sales Status',
        data: [soldItems, pendingItems],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Sales Status',
        font: {
          size: 20
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>Sell Info</Heading>
      <Box height="150px" width="100%">
        <Bar data={data} options={options} />
      </Box>
      <Box mt={4}>
        <List spacing={5}>
          {sales.map((sale) => (
            <ListItem key={sale.id}>
              <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
                <Text fontSize="lg"><strong>Name:</strong> {sale.name}</Text>
                <Text fontSize="lg"><strong>Item:</strong> {sale.vehicleModel}</Text>
                <Text fontSize="lg"><strong>Status:</strong> {sale.status}</Text>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const BuyInfo = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/buyers')
      .then(response => {
        if (Array.isArray(response.data)) {
          setBuyers(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.log('Error fetching buyers:', error);
      });
  }, []);

  const interestedBuyers = buyers.filter(buyer => buyer.status === 'Interested').length;
  const purchasedBuyers = buyers.filter(buyer => buyer.status === 'Purchased').length;

  const data = {
    labels: ['Interested', 'Purchased'],
    datasets: [
      {
        data: [interestedBuyers, purchasedBuyers],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Buy Info</Heading>
      <Flex>
        <Box flex="1">
          <List spacing={5}>
            {buyers.map((buyer) => (
              <ListItem key={buyer.id}>
                <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
                  <Text fontSize="lg"><strong>Name:</strong> {buyer.name}</Text>
                  <Text fontSize="lg"><strong>Car:</strong> {buyer.car}</Text>
                  <Text fontSize="lg"><strong>Status:</strong> {buyer.status}</Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Pie data={data} width={150} height={150} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Admin ;