import React from "react";
import { ChakraProvider, Flex, Box, Heading, Button, Center } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const Login = () => {
    return (
        <div className="main-body">
            
            <ChakraProvider>
                <Flex alignItems="center" justifyContent="center" m="4%" >
                    <Box p={2} width="25%">
                        <Box textAlign="center">
                            <Heading>Login</Heading>
                        </Box>
                        <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg">
                            <Button as={RouterLink} to="/AdminLogin" colorScheme="teal" variant="solid" width="full" mt={8} >Admin Login</Button>
                            <Button as={RouterLink} to="/UserLogin" colorScheme="teal" variant="solid" width="full" mt={4} >User Login</Button>
                        
                        </Box>
                    </Box>
                </Flex>
            </ChakraProvider>
        </div>
    );
}

export default Login;