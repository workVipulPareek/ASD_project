import React, { useState } from 'react';
import { extendTheme, ChakraProvider, Flex, Box, Heading, FormControl, FormLabel, Select, Radio, RadioGroup, Stack, Input, Button, Textarea, Text } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import auto_mechanic from '../images/auto_Mechanic.jpg';
import theme from './themes';
import axios from 'axios';

const customTheme = extendTheme(theme);

const Service = () => {
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleCompany, setVehicleCompany] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [status] = useState('Pending');
  const [isValid, setIsValid] = useState(true); // Initially true, assuming form starts valid


  const handleSubmit = async(e) => {
    e.preventDefault();
    const pattern = /^[A-Z]{5}\d{2}[A-Z]{2}\d{1}[A-Z]{1}\d{6}$/;
    if (pattern.test(vehicleNumber)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log("Submitting:", { name, email, phone, serviceType, vehicleCompany, vehicleModel, vehicleNumber, date, description , status });
  
    try {
      const token = localStorage.getItem('token');  // Retrieve the token from localStorage
      if (!token) {
        alert('You need to log in first');
        return;
      }
  
      const response = await axios.post('http://localhost:5000/Services', {
        name, email, phone, serviceType, vehicleCompany, vehicleModel, vehicleNumber, date,  description ,status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log("Service request successful:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Service request error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "An error occurred while sending Service request");
    }
  };

  return (
    <ChakraProvider theme={customTheme}>
      <div className="main-body">
        <Flex justifyContent="center" mt={8}>
          <Box p={2} width="50%">
            <Box textAlign="center">
              <Heading variant={"main"} as={"h2"} size={"3xl"} color={"teal"}>
                Book A Service
              </Heading>
            </Box>
            <div className="services-Header">
              <div  className='services-Header-Img'>
                <img src={auto_mechanic} alt="auto_mechanic" />
              </div>
            </div>
            <Box bg="#CBD5E0" width="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
              <form onSubmit={handleSubmit}>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row" spacing={4}>
                    <Radio value="Mr" borderColor='black' colorScheme='teal'>
                      Mr
                    </Radio>
                    <Radio value="Mrs" borderColor='black' colorScheme='teal'>
                      Mrs
                    </Radio>
                  </Stack>
                </RadioGroup>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Name</FormLabel>
                  <Input type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Email</FormLabel>
                  <Input type="email" placeholder="Enter your Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Phone Number</FormLabel>
                  <Input type="tel" placeholder="Enter your Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Service Type</FormLabel>
                  <Select placeholder='Select Service Type' value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                    <option value="service1">Paid Service</option>
                    <option value="service2">Free Service</option>
                    <option value="service3">Running Repair</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Vehicle Company</FormLabel>
                  <Input type="text" placeholder="Enter your Vehicle Company" value={vehicleCompany} onChange={(e) => setVehicleCompany(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Vehicle Model</FormLabel>
                  <Input type="text" placeholder="Enter your Vehicle Model" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Vehicle Number (e.g., MALAA82HR4M123456)</FormLabel>
                  <Input type="text" placeholder="Enter your Vehicle Number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} pattern="^[A-Z]{5}\d{2}[A-Z]{2}\d{1}[A-Z]{1}\d{6}$" />
                  {!isValid && <Text color='red'>Enter Valid Vehicle Number (e.g., MALAA82HR4M123456).</Text>}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt={4} ml={1}>Service Date</FormLabel>
                  <Input type="date" placeholder="Enter your Service Date" value={date} onChange={(e) => setDate(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel mt={4} ml={1}>Description</FormLabel>
                  <Textarea placeholder="Enter your Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
                <center>
                  <Button mt={4} colorScheme="teal" type="submit" >
                    Submit
                  </Button>
                </center>
              </form>
            </Box>
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  );
};

export default Service;
