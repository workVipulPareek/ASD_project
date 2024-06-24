import React from "react";
import { VStack, Grid, Box, Heading, Text, Image, extendTheme, ChakraProvider } from "@chakra-ui/react";
import alto from "../images/macleren.jpeg";
import ferrari from "../images/ferrari.jpg";
import porche from "../images/porche.jpg";
import theme from "./themes";

const customTheme = extendTheme(theme);

const cars = [
  { id: 1, image: alto, name: "Car 1", description: "Description for Car 1." },
  { id: 2, image: ferrari, name: "Car 2", description: "Description for Car 2." },
  { id: 3, image: porche, name: "Car 3", description: "Description for Car 3." },
  { id: 4, image: alto, name: "Car 4", description: "Description for Car 4." },
  { id: 5, image: ferrari, name: "Car 5", description: "Description for Car 5." },
  { id: 6, image: porche, name: "Car 6", description: "Description for Car 6." },
  { id: 7, image: alto, name: "Car 7", description: "Description for Car 7." },
  { id: 8, image: ferrari, name: "Car 8", description: "Description for Car 8." },
  { id: 9, image: porche, name: "Car 9", description: "Description for Car 9." }
];

const Buy = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <div className="main-body">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading variant={"main"} as={"h2"} size={"3xl"} color={"teal"}>
              Buy a Car</Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {cars.map(car => (
              <Box bg="#CBD5E0" width="100%" p={4} borderWidth={1} borderRadius={8} boxShadow="lg" overflow="hidden" h="350px">
                <Box h="75%" overflow="hidden" >
                  <Image
                    src={car.image}
                    alt={car.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Box p={4} h="25%">
                  <Heading variant={"navigation"}  size="xl">{car.name}</Heading>
                  <Text variant={"marquee"}  mt={2}>{car.description}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </VStack>
      </div>
    </ChakraProvider>
  );
}

export default Buy;
