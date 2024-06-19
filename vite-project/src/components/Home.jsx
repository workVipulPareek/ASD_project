import React, { useState, useEffect } from 'react';
import { ChakraProvider, Grid, GridItem, Image, Heading, Box, Text, extendTheme } from '@chakra-ui/react';
import axios from 'axios';
import theme from './themes';

const customTheme = extendTheme(theme);

const Home = () => {
    const [carImages, setCarImages] = useState([]);

    useEffect(() => {
        const fetchCarImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: { query: 'car', count: 4 },
                    headers: {
                        Authorization:'Client-ID dgqVapTQ7ZDRV-6dWxxvYRAbN68hFPfZO9y7iT8GnRk'
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
            <Box className='main-body' p={8} bg='gray.50'>
                <Box textAlign="center" mb={8}>
                    <Heading as='h2' size='3xl' mb={4} variant="main" color="teal.500">Welcome to LaRusso Motors</Heading>
                    <Text fontSize='xl' variant="main" color="gray.700">
                        At Larusso Motors, we have a wide selection of cars for sale. We also offer car services and can help you sell your car.
                    </Text>
                </Box>
                <Grid
                    templateColumns='repeat(4, 1fr)'
                    gap={6}
                >
                    {carImages.map((image, index) => (
                        <GridItem key={index} h="40%" w="100%" >
                            <Image src={`${image.urls.raw}&w=300&h=500&fit=crop`} alt={image.alt_description}objectFit='cover' borderRadius='md' boxShadow='md' />
                        </GridItem>
                    ))}
                </Grid>
                <Box mt={12} textAlign="center" variant="marquee">
                    <Box p={4} bg='teal.500' borderRadius='md' boxShadow='md' display='inline-block'>
                        <Heading as='h2' size='2xl' mb={2} color='white'>!!Special Offers!!</Heading>
                        <Text fontSize='xl' color='white'>----Get 10% off your first service and No cost EMI----</Text>
                    </Box>
                </Box>
                <Box mt={8} textAlign="center" p={4} bg='gray.100' borderRadius='md' boxShadow='md'>
                    <Heading as='h4' size='md' mb={2} color='gray.800'>Additional Information</Heading>
                    <Text fontSize='lg' color='gray.600'>Here you can add more details about your services, offers, or any other relevant information.</Text>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default Home;
