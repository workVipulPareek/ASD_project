import React from 'react';
import { ChakraProvider, Button, Grid, GridItem, Image } from '@chakra-ui/react';
import audi from '../images/audi.jpg';
import BMW from '../images/BMW.jpg';
import d from '../images/d.jpg';
import ferrari from '../images/ferrari.jpg';
import McLaren from '../images/McLaren.jpg';
import mustang from '../images/mustang.jpg';

const Home = () => {
    return (
        <ChakraProvider>
            <div className='main-body'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>Welcome to Larusso Auto Group</h1>
                        <p>At Larusso Motors, we have a wide selection of cars for sale. We also offer car services and can help you sell your car.</p>
                    </div>
                </div>
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(4, 1fr)'
                    gap={4}
                    w='100%'
                    h='400px' // Set a fixed height for the grid
                >
                    <GridItem rowSpan={2} colSpan={1}>
                        <Image src={audi} alt='Car 1' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                        <Image src={BMW} alt='Car 2' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    <GridItem rowSpan={2}colSpan={1}>
                        <Image src={ferrari} alt='Car 3' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={1}>
                        <Image src={d} alt='Car 4' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                    <GridItem colSpan={1} bg='tomato'>
                        <Image src={McLaren} alt='Car 5' h='100%' w='100%' objectFit='cover' />
                    </GridItem>
                </Grid>
            </div>
        </ChakraProvider>
    );
}

export default Home;
