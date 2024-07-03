import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { ChakraProvider, Flex, Box, Heading, FormControl, FormLabel, Input, Button, Center } from '@chakra-ui/react';
import axios from 'axios';
import AdminUser from './AdminUser';

const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[roles] = useState('admin');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", { email, password , roles});

        axios.post('http://localhost:4000/AdminRegister', { email, password , roles})
            .then(response => {
                console.log("Admin Registration successful:", response.data);
                alert(response.data.message);
                navigate('/AdminUser');
                window.location.reload();
            })
            .catch(error => {
                console.error("Registration error:", error.response?.data || error.message);
                alert(error.response?.data?.error || "An error occurred");
            });
    };

    return (
        <ChakraProvider>
            <div className='main-body'>
                <Flex alignItems="center" justifyContent="center" m="4%">
                    <Box p={2} width="25%">
                        <Box textAlign="center">
                            <Heading>Register as new Admin</Heading>
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
                                <Button type="submit" colorScheme="teal" variant="solid" width="full" mt={8}>Register</Button>
                                <Center mt={4}>
                                    <Button colorScheme="teal" as={RouterLink} to="/Login" variant="link">Already have an account? Login</Button>
                                </Center>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            </div>
        </ChakraProvider>
    );
};

export default AdminRegister;
