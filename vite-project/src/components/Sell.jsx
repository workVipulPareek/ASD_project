import React, { useState } from 'react';
import { Box, ChakraProvider, Flex, FormControl, Grid, GridItem, Heading, Image, Textarea, VStack, extendTheme, Input, Button, FormLabel, Center, Text } from '@chakra-ui/react';
import theme from './themes';
import car1 from '../images/sell1.webp';
import car2 from '../images/sell2.webp';
import car3 from '../images/sell3.webp';
import pay from '../images/pay.png';
import schedule from '../images/schedule.png';
import offer from '../images/offer.png';


const customTheme = extendTheme(theme);

const Sell = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleCompany, setVehicleCompany] = useState('');
  const [description, setDescription] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pattern = /^[A-Z]{5}\d{2}[A-Z]{2}\d{1}[A-Z]{1}\d{6}$/;
    if (pattern.test(vehicleNumber)) {
      setIsValid(true);
      alert(`Form Submitted Successfully
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Vehicle Company: ${vehicleCompany}
        Vehicle Model: ${vehicleModel}
        Vehicle Number: ${vehicleNumber}
        Description: ${description}`);
    } else {
      setIsValid(false);
    }
  };

  return (
    <ChakraProvider theme={customTheme}>
      <div className='main-body'>

        <Box textAlign="center">
          <Heading size="xl" as='h2' color="gray.600">
            Sell Your Car On your Terms
          </Heading>
        </Box>
        {/* Section 1 */}
        <Grid templateColumns='repeat(6, 1fr)' pt={10} gap={4}>
          <GridItem colSpan={3} h="auto">
            <Box p={4} display="grid" alignContent="center" justifyContent="right">
              <Image src={car1} alt="car1" boxSize="150px" width="200px" objectFit="cover" borderRadius="md" boxShadow="md" />
            </Box>
          </GridItem>
          <GridItem colSpan={3} colStart={4} colEnd={7} h="auto">
            <Box p={4} display="grid" width="200px" justifyContent="left" borderRadius="md" boxShadow="md">
              <VStack align="left" spacing={8}>
                <Heading size="l" textAlign="left" color="gray.600">
                  We'll buy yours even if you don't buy ours
                </Heading>
                <p>
                  Whether it goes on our lot or to auction, we want to make an offer for your car.
                </p>
              </VStack>
            </Box>
          </GridItem>
        </Grid>

        <hr />

        {/* Section 2 */}
        <Grid templateColumns='repeat(6, 1fr)' pt={10} gap={4}>
          <GridItem colSpan={3} h="auto" >
            <Box p={4} display="grid" width="200px" justifyContent="right" borderRadius="md" boxShadow="md">
              <VStack align="left" spacing={8}>
                <Heading size="l" textAlign="right" color="gray.600">
                  Same-day payment, 7-day offer
                </Heading>
                <p>
                  Leave with payment in hand or take up to 7 days to compare your options.
                </p>
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={3} colStart={4} colEnd={7} h="auto">
            <Box p={4} display="grid" alignContent="center" justifyContent="right">
              <Image src={car2} alt="car2" boxSize="150px" width="200px" objectFit="cover" borderRadius="md" boxShadow="md" />
            </Box>
          </GridItem>
        </Grid>

        <hr />

        {/* Section 3 */}
        <Grid templateColumns='repeat(6, 1fr)' pt={10} gap={4}>
          <GridItem colSpan={3} h="auto">
            <Box p={4} display="grid" alignContent="center" justifyContent="right">
              <Image src={car3} alt="car3" boxSize="150px" width="200px" objectFit="cover" borderRadius="md" boxShadow="md" />
            </Box>
          </GridItem>
          <GridItem colSpan={3} colStart={4} colEnd={7} h="auto">
            <Box p={4} display="grid" width="200px" justifyContent="left" borderRadius="md" boxShadow="md">
              <VStack align="left" spacing={8}>
                <Heading size="l" textAlign="left" color="gray.600">
                  An offer you can count on
                </Heading>
                <p>
                  No matter where you sell, start with a custom offer from LaRusso Motors.
                </p>
              </VStack>
            </Box>
          </GridItem>
        </Grid>



        <hr typeof='dotted' />

        <Flex justifyContent="center" mt={8}>
          <Box p={2} width="50%">

            <Box bg="#CBD5E0" width="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
              <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired>
                  <FormLabel mt={4} ml={1}>Name</FormLabel>
                  <Input type="text" placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} />
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
                <FormControl>
                  <FormLabel mt={4} ml={1}>Description</FormLabel>
                  <Textarea placeholder="Enter your Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
                <Center>
                  <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                  </Button>
                </Center>
              </form>
            </Box>
          </Box>
        </Flex>
        <br
        />
        <br />
        <div className='sell-bg'>
          <Box p={4} height="100%" borderWidth={1} borderRadius={8} boxShadow="lg" alignContent="center" justifyContent="center" bgColor="grey">
            <Box textAlign="center">
              <Heading size="xl" as='h1' variant="footer">
                How It Works?
              </Heading>
            </Box>
            <Grid templateColumns='repeat(3, 1fr)' pt={10} gap={4}>
              <GridItem colSpan={1} h="auto">
                <Box textAlign="center" b>
                  <Image src={pay} alt="pay" boxSize="150px" objectFit="contain" mx="auto" />
                  <Heading size="md" as='h2' color="gray.600" mt={4}>
                    Get your offer
                  </Heading>
                  <Text>
                    It takes less than 2 minutes
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1} h="auto">
                <Box textAlign="center" >
                  <Image src={schedule} alt="Schedule" boxSize="150px" objectFit="contain" mx="auto" />
                  <Heading size="md" as='h2' color="gray.600" mt={4}>
                    Schedule an appointment
                  </Heading>
                  <Text>
                    Redeem it or compare your options for 7 days.
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1} h="auto">
                <Box textAlign="center" >
                  <Image src={offer} alt="Offer" boxSize="150px" objectFit="contain" mx="auto" />
                  <Heading size="md" as='h2' color="gray.600" mt={4}>
                    Come get paid
                  </Heading>
                  <Text>
                    We'll verify your offer and pay you on the spot.
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </div>

      </div>
    </ChakraProvider>
  );
};

export default Sell;
