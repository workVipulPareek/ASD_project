import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, ChakraProvider } from "@chakra-ui/react";

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const carName = queryParams.get("name");
  const price = queryParams.get("price");
  const transactionId = queryParams.get("transactionId");

  const navigate = useNavigate();

  return (
    <ChakraProvider>
      <Box p={8} textAlign="center" maxW="500px" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading size="lg" color="green.500">🎉 Payment Successful!</Heading>
        <Text fontSize="lg" mt={4}>Thank you for purchasing <strong>{carName}</strong></Text>
        <Text fontSize="lg" mt={2}>Amount Paid: <strong>${price}</strong></Text>
        <Text fontSize="md" mt={2} color="gray.600">Transaction ID: <strong>{transactionId}</strong></Text>

        <VStack spacing={4} mt={6}>
          <Button colorScheme="blue" onClick={() => navigate("/Home")}>Go to Home</Button>
          <Button colorScheme="teal" onClick={() => navigate("/Buy")}>Shop More Cars</Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default SuccessPage;
