// Import necessary modules from React and Chakra UI
import React, { useEffect, useState } from "react";
import { VStack, Grid, Box, Button, Heading, Text, Image, ChakraProvider } from "@chakra-ui/react";
import axios from 'axios';

// Import images for cars
import rollsroyce from "../images/rollsroyce.webp";
import bentley from "../images/bentley.webp";
import mercedes from "../images/mercedes.webp";
import bmw from "../images/bmw7.jpeg";
import audi from "../images/audia8.avif";
import defender from "../images/defender.webp";
import lexus from "../images/lexus.webp";
import volvo from "../images/volvo.webp";
import maserati from "../images/maserati.jpeg";

// Buy component definition
const Buy = () => {
  const [cars, setCars] = useState([]);

  // Fetch car data from backend on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  // Handle buying a car
  const handleBuy = (id) => {
    axios.post(`http://localhost:5000/buy/${id}`)
      .then(response => {
        alert(response.data.message);
        // Update car quantity locally after successful purchase
        setCars(cars.map(car => car._id === id ? { ...car, quantity: car.quantity - 1 } : car));
      })
      .catch(error => {
        alert(error.response?.data?.message || 'Error purchasing car');
      });
  };

  return (
    <ChakraProvider>
      <div className="main-body">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading as="h2" size="3xl" color="teal">
              Buy a Car
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {cars.slice(0, 9).map((car) => (
              <Box
                key={car._id}
                bg="#CBD5E0"
                p={4}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                overflow="hidden"
                h="400px"
                _hover={{
                  bg: "#E2E8F0",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <Box h="70%" overflow="hidden">
                  <Image
                    src={getCarImage(car.image)}
                    alt={car.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Box p={4} h="30%" textAlign="left">
                  <Heading size="xl">
                    {car.name}
                  </Heading>
                  <Text mt={2} noOfLines={3}>
                    {car.description}
                  </Text>
                  {car.quantity === 0 ? (
                    <Text mt={2} color="red.500">
                      Out of Stock
                    </Text>
                  ) : (
                    <Button
                      width="md"
                      mt={2}
                      colorScheme="teal"
                      onClick={() => handleBuy(car._id)}
                    >
                      Buy
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Grid>
        </VStack>
      </div>
    </ChakraProvider>
  );
};

// Function to get car image based on image name
const getCarImage = (imageName) => {
  switch (imageName) {
    case 'rollsroyce':
      return rollsroyce;
    case 'bentley':
      return bentley;
    case 'mercedes':
      return mercedes;
    case 'bmw':
      return bmw;
    case 'audi':
      return audi;
    case 'defender':
      return defender;
    case 'lexus':
      return lexus;
    case 'volvo':
      return volvo;
    case 'maserati':
      return maserati;
    default:
      return '';
  }
};

export default Buy;
