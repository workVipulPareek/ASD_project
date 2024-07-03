import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { ChakraProvider, Flex, Box, Heading, FormControl, FormLabel, Input, Button, Center } from '@chakra-ui/react';
import axios from 'axios';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", { email, password });

        axios.post('http://localhost:4000/Register', { name, email, password,  phone, address})
            .then(response => {
                console.log("Registration successful:", response.data);
                alert(response.data.message);
                navigate('/Home');
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
                            <Heading>Register</Heading>
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
                                <FormControl isRequired>
                                    <FormLabel mt={4} ml={1}>Name</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel mt={4} ml={1}>Phone</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter your Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel mt={4} ml={1}>Address</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter your Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </FormControl>
                                <Button type="submit" colorScheme="teal" variant="solid" width="full" mt={8}>Register</Button>
                                <Button as={RouterLink} to="/Home" colorScheme="red" variant="solid" width="full" mt={4}>Back</Button>

                            </form>
                        </Box>
                    </Box>
                </Flex>
            </div>
        </ChakraProvider>
    );
};

export default Register;
