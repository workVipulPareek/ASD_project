import React from 'react';
import { ChakraProvider, Button, Grid, GridItem, Image, Heading, Box, Text } from '@chakra-ui/react';
import audi from '../images/audi.jpg';
import BMW from '../images/BMW.jpg';
import d from '../images/d.jpg';
import ferrari from '../images/ferrari.jpg';
import McLaren from '../images/McLaren.jpg';
import mustang from '../images/mustang.jpg';
import { TbMarquee } from 'react-icons/tb';

const Home = () => {
    return (
        <ChakraProvider>
            <div className='main-body'>
                <div className='row'>
                    <Box maxW='320rem'>
                        <Heading as='h2' size='3xl' noOfLines={1}>Welcome to LaRusso Motors</Heading>
                        <Text fontsize='xl '>At Larusso Motors, we have a wide selection of cars for sale. We also offer car services and can help you sell your car.</Text>
                    </Box>
                </div>
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(4, 1fr)'
                    gap={4}
                    w='100%'
                    h='500px' // Set a fixed height for the grid
                >
                    <GridItem >
                        <Image src={audi} alt='Car 1' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    <GridItem >
                        <Image src={BMW} alt='Car 2' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    <GridItem >
                        <Image src={ferrari} alt='Car 3' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    <GridItem >
                        <Image src={d} alt='Car 4' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    {/* <GridItem >
                        <Image src={McLaren} alt='Car 5' h='100%' w='100%' objectFit='cover' />
                    </GridItem> */}
                </Grid>
                <br></br>
                <marquee>
                    <box>
                        <Heading as='h2' size = '2xl'>!!Special Offers!!</Heading>
                        <Text fontsize='xl'>----Get 10% off your first service and No cost EMI----</Text>
                    </box>
                </marquee>
            </div>
        </ChakraProvider>
    );
}

export default Home;
