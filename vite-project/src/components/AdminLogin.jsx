import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { ChakraProvider, Flex, Box, Heading, FormControl, FormLabel, Input, Button, Center } from '@chakra-ui/react';
import axios from 'axios';
import AdminUser from './AdminUser'
function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[roles] = useState('admin');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", { email, password , roles}); // Log for debugging
        axios.post('http://localhost:5000/AdminLogin', { email, password , roles})
            .then(response => {
                const { token , roles} = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('roles', JSON.stringify(roles));
                console.log("Login successful:", response.data);
                navigate('/AdminUser');
                window.location.reload();
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
                            <Heading>Admin Login</Heading>
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
                                <Button colorScheme="teal" as={RouterLink} to="/AdminRegister" variant="link">Didn't have an Account? Create one!</Button>
                                </Center>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            </div>
        </ChakraProvider>
    );
}

export default AdminLogin;
