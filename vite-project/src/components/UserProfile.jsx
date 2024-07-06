import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, List, ListItem, Heading, ChakraProvider, VStack, HStack, Button, Center } from '@chakra-ui/react';
import theme from './themes';
import { Link as RouterLink } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [userRequests, setUserRequests] = useState([]);
    const [userResellData, setUserResellData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:4000/userProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchUserRequests = async () => {
            try {
                const request = await axios.get('http://localhost:4000/userServiceRequests', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserRequests(request.data);
            } catch (error) {
                console.error('Error fetching user requests:', error);
            }
        };

        const fetchResellRequests = async () => {
            try {
                const request = await axios.get('http://localhost:4000/userSellRequests', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserResellData(request.data);
            } catch (error) {
                console.error('Error fetching user Resell requests:', error);
            }
        };

        if (token) {
            fetchUserProfile();
            fetchUserRequests();
            fetchResellRequests();
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <ChakraProvider theme={theme}>
            <div className='main-body'>
                <Heading size="3xl" mb={4} variant="footer" textAlign="center" color="teal" mt={8}>
                    User Profile
                </Heading>
                <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="800px" mx="auto">

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
                    <Center>
                        <Button as={RouterLink} to="/EditUserProfile" colorScheme="teal" variant="solid" mt={8}>
                            Edit Profile
                        </Button>
                    </Center>
                </Box>
                <br />
                <hr>
                </hr>
                <br />
                <Box mt={8}>
                    <Heading size="2xl" mb={4} variant="footer" textAlign="center" color="teal">
                        Know the status of your Service Request
                    </Heading>
                    <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="800px" mx="auto">
                        <List spacing={5}>
                            {userRequests.map((request) => (
                                <ListItem key={request._id}>
                                    {/* <Box p={4} boxShadow="md" borderRadius="md" bg="white"> */}
                                    <Text><strong>Name:</strong>{request.name}</Text>
                                    <Text><strong>Service:</strong> {request.serviceType}</Text>
                                    <Text><strong>Status:</strong> {request.status}</Text>
                                    {/* </Box> */}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
                <br />
                <hr>
                </hr>
                <br />
                <Box mt={8}>
                    <Heading size="2xl" mb={4} variant="footer" textAlign="center" color="teal">
                        Know the status of your Resell Request
                    </Heading>
                    <Box p={8} bg='#CBD5E0' borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="800px" mx="auto">
                        <List spacing={5}>
                            {userResellData.map((request) => (
                                <ListItem key={request._id}>
                                    {/* <Box p={4} boxShadow="md" borderRadius="md" bg="white"> */}
                                    <Text><strong>Name:</strong>{request.name}</Text>
                                    <Text><strong>Service:</strong> {request.serviceType}</Text>
                                    <Text><strong>Status:</strong> {request.status}</Text>
                                    {/* </Box> */}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </div>
        </ChakraProvider>
    );
}

export default UserProfile;
