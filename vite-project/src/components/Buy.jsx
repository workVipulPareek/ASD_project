import React from "react";
import {
  VStack,
  Grid,
  Box,
  Button,
  Heading,
  Text,
  Image,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import rollsroyce from "../images/rollsroyce.webp";
import bentely from "../images/bentley.webp";
import mercedes from "../images/mercedes.webp";
import bmw from "../images/bmw7.jpeg";
import audi from "../images/audia8.avif";
import defender from "../images/defender.webp";
import lexus from "../images/lexus.webp";
import volvo from "../images/volvo.webp";
import maserati from "../images/maserati.jpeg";
import theme from "./themes";

const customTheme = extendTheme(theme);

const cars = [
  {
    id: 1,
    image: rollsroyce,
    name: "Rolls-Royce Phantom:",
    description:
      " Epitome of luxury and refinement with bespoke craftsmanship.",
  },
  {
    id: 2,
    image: bentely,
    name: "Bentley Continental GT:",
    description:
      " Powerful grand tourer blending opulence with dynamic performance.",
  },
  {
    id: 3,
    image: mercedes,
    name: "Mercedes-Maybach S-Class:",
    description:
      " Ultimate in chauffeur-driven luxury and cutting-edge technology.",
  },
  {
    id: 4,
    image: bmw,
    name: "BMW 7 Series:",
    description:
      " Executive sedan known for its comfort, innovation, and driving dynamics.",
  },
  {
    id: 5,
    image: audi,
    name: "Audi A8 L:",
    description:
      " Flagship sedan offering exceptional comfort, style, and advanced driver assistance systems.",
  },
  {
    id: 6,
    image: defender,
    name: "Defender",
    description:
      "The Defender is a rugged, off-road capable SUV produced by Land Rover, known for its durability and versatile performance in challenging terrains.",
  },
  {
    id: 7,
    image: lexus,
    name: "Lexus LS 500h:",
    description:
      " Japanese luxury hybrid sedan renowned for its comfort and reliability.",
  },
  {
    id: 8,
    image: volvo,
    name: "Volvo XC90 Excellence:",
    description:
      " Premium SUV offering Scandinavian luxury and advanced safety features.",
  },
  {
    id: 9,
    image: maserati,
    name: "Maserati Quattroporte:",
    description:
      " Italian luxury sedan with a blend of sportiness and refined elegance.",
  },
];

const Buy = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <div className="main-body">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading variant={"main"} as={"h2"} size={"3xl"} color={"teal"}>
              Buy a Car
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {cars.map((car) => (
              <Box
                bg="#CBD5E0"
                width="100%"
                p={4}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                overflow="hidden"
                h="350px"
              >
                <Box h="70%" overflow="hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Box p={4} h="30%" textAlign={"left"}>
                  <Heading variant={"navigation"} size="xl">
                    {car.name}
                  </Heading>
                  <Text variant={"marquee"} mt={2}>
                    {car.description}
                  </Text>
                  <center>
                    <Button width={"md"} bg="teal" color="white">
                      Buy
                    </Button>
                  </center>
                </Box>
              </Box>
            ))}
          </Grid>
        </VStack>
      </div>
    </ChakraProvider>
  );
};

export default Buy;
