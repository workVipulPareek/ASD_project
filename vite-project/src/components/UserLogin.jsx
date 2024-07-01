import React, { useState } from 'react';
import { Route, Router, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { ChakraProvider, Flex, Box, Heading, FormControl, FormLabel, Input, Button, Center } from '@chakra-ui/react';
import axios from 'axios';

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", { email, password }); // Log for debugging
        axios.post('http://localhost:5000/UserLogin', { email, password })
            .then(response => {
                const { token } = response.data;
                localStorage.setItem('token', token);
                console.log("Login successful:", response.data);
                alert(response.data.message);
                navigate('/');
            })
            .catch(error => {
                console.error("Login error:", error.response?.data || error.message);
                alert(error.response?.data?.error || "An error occurred");
            });
    };

    return (
        <ChakraProvider>
            <div className='main-body'>
                <Flex alignItems="center" justifyContent="center" m="4%" >
                    <Box p={2} width="25%">
                        <Box textAlign="center">
                            <Heading>User Login</Heading>
                        </Box>
                        <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg">
                            <form onSubmit={handleSubmit}>
                                <FormControl isRequired>
                                    <FormLabel mt={4} ml={1}>Email</FormLabel>
                                    <Input 
                                        type="email" 
                                        placeholder="Enter your Email Id" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel mt={4} ml={1}>Password</FormLabel>
                                    <Input 
                                        type="password" 
                                        placeholder="*******" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <Button type="submit" colorScheme="teal" variant="solid" width="full" mt={8}>Sign In</Button>
                                <Button colorScheme="red" variant="solid" width="full" mt={4}>
                                    Sign In with Google
                                </Button>
                                <hr />
                                
                                <Center mt={4}>
                                    <Button colorScheme="teal" as={RouterLink} to="/UserRegister" variant="link">Didn't have an Account? Create one!</Button>
                                </Center>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            </div>
        </ChakraProvider>
    );
}

export default UserLogin;
