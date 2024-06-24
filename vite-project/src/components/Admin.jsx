import React, { useState } from 'react';
import { ChakraProvider, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Heading, Button, List, ListItem } from '@chakra-ui/react';

const Admin = () => {
  return (
    <ChakraProvider>
      <div className='main-body'>
      <Box p={5}>
        <Heading as="h1" size="xl" mb={5}>Admin Panel</Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>User Info</Tab>
            <Tab>Services Request</Tab>
            <Tab>Sell Info</Tab>
            <Tab>Buy Info</Tab>
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
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>User Info</Heading>
      <List spacing={3}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </Box>
              <Button colorScheme="red" onClick={() => deleteUser(user.id)}>Delete</Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const ServiceRequest = () => {
  const [requests, setRequests] = useState([
    { id: 1, service: 'Web Hosting', status: 'Pending' },
    { id: 2, service: 'Domain Registration', status: 'Completed' },
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
      <List spacing={3}>
        {requests.map((request) => (
          <ListItem key={request.id}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <p>{request.service} - {request.status}</p>
              </Box>
              <Box>
                <Button colorScheme="blue" mr={2} onClick={() => forwardRequest(request.id)}>Forward</Button>
                <Button colorScheme="red" onClick={() => deleteRequest(request.id)}>Delete</Button>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const SellInfo = () => {
  const [sales, setSales] = useState([
    { id: 1, item: 'Laptop', price: '$1000', status: 'Sold' },
    { id: 2, item: 'Phone', price: '$500', status: 'Pending' },
  ]);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Sell Info</Heading>
      <List spacing={3}>
        {sales.map((sale) => (
          <ListItem key={sale.id}>
            <p>{sale.item} - {sale.price} - {sale.status}</p>
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
  ]);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Buy Info</Heading>
      <List spacing={3}>
        {buyers.map((buyer) => (
          <ListItem key={buyer.id}>
            <p>{buyer.name} - {buyer.car} - {buyer.status}</p>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Admin;