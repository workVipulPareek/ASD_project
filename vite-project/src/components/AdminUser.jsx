import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  useToast,
  ChakraProvider
} from '@chakra-ui/react';
import { isLoggedIn, isAdmin, logout } from '../../../server/authUtil';

function UserInfo() {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      navigate('/Home'); // Redirect to home or another page if not an admin
    } else {
      axios.get('http://localhost:5000/users')
        .then(response => {
          if (Array.isArray(response.data)) {
            setUsers(response.data);
          } else {
            console.error('Fetched data is not an array:', response.data);
            toast({
              title: 'Error',
              description: 'Fetched data is not an array',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch(error => {
          console.log('Error fetching users:', error);
          toast({
            title: 'Error',
            description: 'Error fetching users',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [navigate, toast]);

  const deleteUser = (email) => {
    axios.delete(`http://localhost:5000/users/${email}`)
      .then(response => {
        setUsers(users.filter(user => user.email !== email));
        toast({
          title: 'User deleted',
          description: 'User has been successfully deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log('Error deleting user:', error);
        toast({
          title: 'Error',
          description: 'Error deleting user',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };
  
  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading as="h2" size="lg" mb={4}>User Info</Heading>
        <List spacing={5}>
          {users.map((user) => (
            <ListItem key={user._id}>
              <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text fontSize="lg"><strong>Name:</strong> {user.name}</Text>
                    <Text fontSize="lg"><strong>Email:</strong> {user.email}</Text>
                    <Text fontSize="lg"><strong>Role:</strong> {user.role}</Text>
                  </Box>
                  <Button colorScheme="red" onClick={() => deleteUser(user.email)}>Delete</Button>
                </Flex>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </ChakraProvider>
  );
}

export default UserInfo;
