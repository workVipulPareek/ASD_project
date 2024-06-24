import React, { useState } from 'react';
import { ChakraProvider, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Heading, Button, List, ListItem, Text, Flex } from '@chakra-ui/react';

const Admin = () => {
  return (
    <ChakraProvider>
      <Box p={5}>
      <Heading as="h1" size="xl" mb={5} textAlign="center" fontWeight="extrabold">Admin Panel</Heading>
      <Tabs variant="enclosed" size="lg">
          <TabList>
            <Tab 
              _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} 
              bg="lightblue" 
              color="white" 
              fontWeight="bold" 
              _hover={{ bg: 'blue.300' }}
            >
              User Info
            </Tab>
            <Tab 
              _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} 
              bg="lightblue" 
              color="white" 
              fontWeight="bold" 
              _hover={{ bg: 'blue.300' }}
            >
              Services Request
            </Tab>
            <Tab 
              _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} 
              bg="lightblue" 
              color="white" 
              fontWeight="bold" 
              _hover={{ bg: 'blue.300' }}
            >
              Sell Info
            </Tab>
            <Tab 
              _selected={{ bg: 'black', color: 'white', fontWeight: 'bold' }} 
              bg="lightblue" 
              color="white" 
              fontWeight="bold" 
              _hover={{ bg: 'blue.300' }}
            >
              Buy Info
            </Tab>
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
    </ChakraProvider>
  );
};

const UserInfo = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, name: 'Jadie Johnson', email: 'jadie.johnson@example.com', role: 'User' },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>User Info</Heading>
      <List spacing={5} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontSize="lg"><strong>Name:</strong> {user.name}</Text>
                <Text fontSize="lg"><strong>Email:</strong> {user.email}</Text>
                <Text fontSize="lg"><strong>Role:</strong> {user.role}</Text>
              </Box>
              <Button colorScheme="red" onClick={() => deleteUser(user.id)}>Delete</Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const ServiceRequest = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', service: 'Suspension Change', status: 'Pending' },
    { id: 2, name: 'Jane Smith', service: 'Window Repair', status: 'Completed' },
    { id: 3, name: 'Jadie Johnson', service: 'Seat Issue', status: 'Completed' },
    { id: 4, name: 'Alice Johnson', service: 'Music System Repair', status: 'Completed' },
  ]);

  const deleteRequest = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  const forwardRequest = (id) => {
    alert(`Service request ${id} forwarded.`);
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Services Request</Heading>
      <List spacing={5} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {requests.map((request) => (
          <ListItem key={request.id}>
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
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const SellInfo = () => {
  const [sales, setSales] = useState([
    { id: 1, name: 'John Doe', item: 'Gearbox', price: '$1000', status: 'Sold' },
    { id: 2, name: 'Jane Smith', item: 'Suspension', price: '$500', status: 'Pending' },
    { id: 3, name: 'Jadie Johnson', item: 'BMW X200', price: '$3M', status: 'Sold' },
    { id: 4, name: 'Alice Johnson', item: 'Audi R8', price: '$2M', status: 'Pending' },
    { id: 5, name: 'Bob Brown', item: 'Mercedes Benz', price: '$5M', status: 'Pending' },
  ]);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Sell Info</Heading>
      <List spacing={5} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {sales.map((sale) => (
          <ListItem key={sale.id}>
            <Box>
              <Text fontSize="lg"><strong>Name:</strong> {sale.name}</Text>
              <Text fontSize="lg"><strong>Item:</strong> {sale.item}</Text>
              <Text fontSize="lg"><strong>Price:</strong> {sale.price}</Text>
              <Text fontSize="lg"><strong>Status:</strong> {sale.status}</Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const BuyInfo = () => {
  const [buyers, setBuyers] = useState([
    { id: 1, name: 'Alice', car: 'Toyota', status: 'Interested' },
    { id: 2, name: 'Bob', car: 'Honda', status: 'Purchased' },
    { id: 3, name: 'Zayn', car: 'Ferrari', status: 'Purchased' },
  ]);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Buy Info</Heading>
      <List spacing={5} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {buyers.map((buyer) => (
          <ListItem key={buyer.id}>
            <Text fontSize="lg"><strong>Name:</strong> {buyer.name}</Text>
            <Text fontSize="lg"><strong>Car:</strong> {buyer.car}</Text>
            <Text fontSize="lg"><strong>Status:</strong> {buyer.status}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Admin;
