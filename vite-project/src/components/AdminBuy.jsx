import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text, Flex, VStack, Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../../../server/authUtil';  // Ensure these functions are correctly implemented and imported

const AdminBuy = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/Home');  // Redirect non-admin users to home
    } else {
      axios.get('http://localhost:5000/cars')
        .then(response => {
          if (Array.isArray(response.data)) {
            setCars(response.data);
          } else {
            console.error('Fetched data is not an array:', response.data);
          }
        })
        .catch(error => {
          console.log('Error fetching cars:', error);
        });
    }
  }, [navigate]);

  if (!isLoggedIn()) {
    navigate('/LoginForm');  // Redirect unauthenticated users to login
    return null;
  }

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>Car Inventory</Heading>
      <VStack spacing={8} align="stretch">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {cars.slice(0, 9).map((car) => (
            <Box
              key={car._id}
              p={4}
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg"
              bg="white"
              h="150px"
            >
              <Text fontSize="xl" fontWeight="bold">{car.name}</Text>
              <Text mt={2}>Quantity: {car.quantity}</Text>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default AdminBuy;
