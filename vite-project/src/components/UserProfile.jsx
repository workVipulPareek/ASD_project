import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Image, Heading, Text, Button, ChakraProvider, HStack, VStack, Center, extendTheme } from '@chakra-ui/react';
import theme from './themes';
import { Link as RouterLink } from 'react-router-dom';

const customTheme = extendTheme(theme);

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debug: Log the token

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/userProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response:', response.data); 

                setUser(response.data); 
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (token) {
            fetchUserProfile();
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <ChakraProvider theme={customTheme}>
            <div className='main-body'>
                <Box >
                    <Heading size="3xl" mb={4} variant="footer" textAlign="center" color="teal" mt={8}>
                        User Profile
                    </Heading>
                </Box>
                <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="800px" mx="auto">
                    <Center>
                        <VStack alignItems="flex-start">
                            <HStack>
                                <Heading size="md" color="teal">Name:</Heading>
                                <Text fontSize="lg" color="gray.10" fontWeight="bold">{user.name}</Text>
                            </HStack>
                            <HStack>
                                <Heading size="md" color="teal">Email:</Heading>
                                <Text fontSize="lg" color="gray.10" fontWeight="bold">{user.email}</Text>
                            </HStack>
                            <HStack>
                                <Heading size="md" color="teal">Phone:</Heading>
                                <Text fontSize="lg" color="gray.10" fontWeight="bold">{user.phone}</Text>
                            </HStack>
                            <HStack>
                                <Heading size="md" color="teal">Address:</Heading>
                                <Text fontSize="lg" color="gray.10" fontWeight="bold">{user.address}</Text>
                            </HStack>
                        </VStack>
                    </Center>
                    <Center>
                        <Button as={RouterLink} to="/EditUserProfile" colorScheme="teal" variant="solid" mt={8}>
                            Edit Profile
                        </Button>
                    </Center>
                </Box>
                <br></br>
                <hr />
                <br></br>
                <Box >
                    <Heading size="2xl" mb={4} variant="footer" textAlign="center" color="teal" mt={8}>
                        Know the status of your Resell Request
                    </Heading>
                    <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="800px" mx="auto">
                    </Box>

                </Box>
                <br></br>
                <hr />
                <br></br>
                <Box >
                    <Heading size="2xl" mb={4} variant="footer" textAlign="center" color="teal" mt={8}>
                        Know the status of your Order
                    </Heading>
                    <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="800px" mx="auto">
                    </Box>

                </Box>
                <br></br>
                <hr />
                <br></br>
                <Box >
                    <Heading size="2xl" mb={4} variant="footer" textAlign="center" color="teal" mt={8}>
                        Know the status of your Resell Request
                    </Heading>
                    <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="800px" mx="auto">
                    </Box>
                </Box>

            </div>
        </ChakraProvider>
    );
}

export default UserProfile;
