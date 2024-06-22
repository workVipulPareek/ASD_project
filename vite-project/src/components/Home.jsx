import React, { useState, useEffect } from 'react';
import {extendTheme, ChakraProvider, Box, Heading, Text, Grid, GridItem, Image, Link } from '@chakra-ui/react';
import axios from 'axios';
import theme from './themes'; // Make sure you have a theme file exported correctly

const customTheme = extendTheme(theme); // Assuming `extendTheme` is correctly used

const Home = () => {
    const [carImages, setCarImages] = useState([]);

    useEffect(() => {
        const fetchCarImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: { query: 'car', count: 4 },
                    headers: {
                        Authorization: 'Client-ID dgqVapTQ7ZDRV-6dWxxvYRAbN68hFPfZO9y7iT8GnRk'
                    }
                });
                setCarImages(response.data);
            } catch (error) {
                console.error('Error fetching car images:', error);
            }
        };
        fetchCarImages();
    }, []);

    return (
        <ChakraProvider theme={customTheme}>
            <Box className='main-body' p={8}>
                <Box textAlign="center" mb={8}>
                    <Heading as='h2' size='3xl' mb={4} variant="main" color="teal.500">Welcome to LaRusso Motors</Heading>
                    <Text fontSize='xl' variant="main" color="gray.700">
                        At Larusso Motors, we have a wide selection of cars for sale. We also offer car services and can help you sell your car.
                    </Text>
                </Box>

                {/* Grid Section */}
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    {carImages.map((image, index) => (
                        <GridItem key={index} h="40%" w="100%">
                            <Image src={`${image.urls.raw}&w=300&h=500&fit=crop`} alt={image.alt_description} objectFit='cover' borderRadius='md' boxShadow='md' />
                        </GridItem>
                    ))}
                </Grid>

                {/* Special Offers Section */}
                <Box mt={12} textAlign="center">
                    <Box p={4} bg='teal.500' borderRadius='md' boxShadow='md' display='inline-block'>
                        <Heading as='h2' size='2xl' mb={2} color='white'>!!Special Offers!!</Heading>
                        <Text fontSize='xl' color='white'>----Get 10% off your first service and No cost EMI----</Text>
                    </Box>
                </Box>

                {/* Additional Information Section */}
                <Box mt={8} textAlign="center" p={4} boxShadow='md' bg='teal.100'>
                    <Heading as='h4' size='md' mb={2}>Additional Information</Heading>
                    <Heading as='h5' fontSize='lg' color='gray.600'>
                        <Link href="/Services" mr={2}>Book A Service</Link>
                        <span>||</span>
                        <Link href="/Sell" ml={2} mr={2}>Get most of your Old Car</Link>
                        <span>||</span>
                        <Link href="/Buy" ml={2}>Dynamic Prices</Link>
                    </Heading>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default Home;
