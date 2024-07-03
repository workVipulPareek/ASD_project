import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, ChakraProvider, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const EditUserProfile = () => {
    const [user, setUser] = useState({ name: '', phone: '', address: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:4000/UserProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            console.log('Submitting user data:', user);
            await axios.post('http://localhost:4000/EditUserProfile', user, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('User profile updated successfully');
            navigate('/UserProfile'); // Navigate back to user profile after successful update
        } catch (error) {
            console.error('Error updating user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ChakraProvider>
            <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius={8} boxShadow="lg">
                <Heading mb={6}>Edit Profile</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" name="name" value={user.name} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl id="phone">
                            <FormLabel>Phone</FormLabel>
                            <Input type="text" name="phone" value={user.phone} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl id="address">
                            <FormLabel>Address</FormLabel>
                            <Input type="text" name="address" value={user.address} onChange={handleInputChange} />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" isLoading={loading}>
                            Update Profile
                        </Button>
                    </VStack>
                </form>
            </Box>
        </ChakraProvider>
    );
};

export default EditUserProfile;
