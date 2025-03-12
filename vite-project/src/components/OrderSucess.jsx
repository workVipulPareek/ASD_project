import React from "react";
import { Box, Heading, Text, Button, ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <ChakraProvider>

    <Box textAlign="center" p={6}>
        <div className="main-body">
            <Box textAlign="center" p={6}>
              <Heading color="green.500">Payment Successful! 🎉</Heading>
              <Text fontSize="xl" mt={4}>Your car purchase has been completed.</Text>
              <Button mt={6} colorScheme="blue" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </Box>
        </div>
    </Box>  
    </ChakraProvider>
  );
};

export default OrderSuccess;
