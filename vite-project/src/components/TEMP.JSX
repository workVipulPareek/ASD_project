import React from "react";
import { VStack, Grid, Box, Heading, Text, Image, Button } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import alto from "../images/macleren.jpeg";
import ferrari from "../images/ferrari.jpg";
import porche from "../images/porche.jpg";

const cars = [
  { id: 1, images: [alto, ferrari, porche], name: "Car 1", description: "Description for Car 1." },
  { id: 2, images: [alto, ferrari, porche], name: "Car 2", description: "Description for Car 2." },
  { id: 3, images: [alto, ferrari, porche], name: "Car 3", description: "Description for Car 3." },
  { id: 4, images: [alto, ferrari, porche], name: "Car 4", description: "Description for Car 4." },
  { id: 5, images: [alto, ferrari, porche], name: "Car 5", description: "Description for Car 5." },
  { id: 6, images: [alto, ferrari, porche], name: "Car 6", description: "Description for Car 6." },
  { id: 7, images: [alto, ferrari, porche], name: "Car 7", description: "Description for Car 7." },
  { id: 8, images: [alto, ferrari, porche], name: "Car 8", description: "Description for Car 8." },
  { id: 9, images: [alto, ferrari, porche], name: "Car 9", description: "Description for Car 9." },
];

const Buy = () => {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center" mb={8}>
        <Heading as="h2" size="3xl" color="teal">
          Buy a Car
        </Heading>
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {cars.map((car) => (
          <Box key={car.id} boxShadow="md" borderWidth="1px" borderRadius="md" overflow="hidden" h="350px" position="relative">
            <Box height="75%">
              <Slider {...sliderSettings}>
                {car.images.map((image, index) => (
                  <Box key={index} height="100%">
                    <Image src={image} alt={`Car ${car.id}`} objectFit="cover" w="100%" h="100%" />
                  </Box>
                ))}
              </Slider>
            </Box>
            <Box p={4} height="25%" textAlign="center" bg="white" boxShadow="md" borderBottomRadius="md">
              <Heading as="h3" size="md" mb={2}>
                {car.name}
              </Heading>
              <Text fontSize="sm" mb={2}>
                {car.description}
              </Text>
              <Button colorScheme="teal" size="sm">
                Buy Now
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

export default Buy;
