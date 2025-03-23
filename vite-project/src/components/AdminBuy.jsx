import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, Text, VStack, Grid, Button, Flex, Input, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  FormControl, FormLabel, useDisclosure
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../../../server/authUtil';

const AdminBuy = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [newCar, setNewCar] = useState({
    name: '', price: '', quantity: '', company: '', launchYear: '', engineType: '',
    engineCapacity: '', bodyStyle: '', materialUsed: '', suspensionType: '',
    brakes: '', steeringType: '', fuelTankCapacity: '', batteryCapacity: '',
    parkingAssistance: '', image: ''
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/Home');
    } else {
      fetchCars();
    }
  }, [navigate]);

  if (!isLoggedIn()) {
    navigate('/LoginForm');
    return null;
  }

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin_cars');
      if (Array.isArray(response.data)) {
        setCars(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const updateQuantity = async (carId, newQuantity) => {
    if (newQuantity < 0) return;
    try {
      await axios.put(`http://localhost:4000/update_car/${carId}`, { quantity: newQuantity });
      setCars(prevCars =>
        prevCars.map(car =>
          car._id === carId ? { ...car, quantity: newQuantity } : car
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const updateCarDetails = async () => {
    try {
      await axios.put(`http://localhost:4000/update_car/${selectedCar._id}`, selectedCar);
      onClose();
      fetchCars();
    } catch (error) {
      console.error('Error updating car details:', error);
    }
  };

  const addNewCar = async () => {
    try {
      await axios.post('http://localhost:4000/add_car', newCar);
      onNewClose();
      fetchCars();
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>Car Inventory</Heading>

      <Button colorScheme="blue" mb={4} onClick={onNewOpen}>Add New Car</Button>

      <VStack spacing={8} align="stretch">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {cars.map((car) => (
            <Box key={car._id} p={4} borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
              <Text fontSize="xl" fontWeight="bold">{car.name}</Text>
              <Text mt={2}>Quantity: {car.quantity}</Text>

              <Flex mt={3} justify="space-between">
                <Button colorScheme="red" size="sm" onClick={() => updateQuantity(car._id, car.quantity - 1)}>-</Button>
                <Button colorScheme="green" size="sm" onClick={() => updateQuantity(car._id, car.quantity + 1)}>+</Button>
              </Flex>

              <Button mt={2} colorScheme="yellow" size="sm" onClick={() => { setSelectedCar(car); onOpen(); }}>Edit</Button>
            </Box>
          ))}
        </Grid>
      </VStack>

      {/* Edit Car Modal */}
      {selectedCar && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Car</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {Object.keys(selectedCar).map((key) => (
                <FormControl key={key} mt={2}>
                  <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                  <Input
                    name={key}
                    value={selectedCar[key] || ''}
                    onChange={e => setSelectedCar({ ...selectedCar, [key]: e.target.value })}
                  />
                </FormControl>
              ))}
              <Button mt={4} colorScheme="blue" onClick={updateCarDetails}>Save</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Add Car Modal */}
      <Modal isOpen={isNewOpen} onClose={onNewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Car</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {Object.keys(newCar).map((key) => (
              <FormControl key={key} mt={2}>
                <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                <Input
                  name={key}
                  value={newCar[key] || ''}
                  onChange={e => setNewCar({ ...newCar, [key]: e.target.value })}
                />
              </FormControl>
            ))}
            <Button mt={4} colorScheme="green" onClick={addNewCar}>Add Car</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminBuy;
