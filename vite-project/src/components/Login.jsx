import React, { useState } from 'react';
import { ChakraProvider, Flex, Box, Heading, FormControl, FormLabel, Input, Button, Center } from '@chakra-ui/react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Email: ${email} & Password: ${password}`);
    };

    return (
        <ChakraProvider>
            <div className='main-body'>
                <Flex alignItems="center" justifyContent="center" m="4%" >
                    <Box p={2} width="25%">
                        <Box textAlign="center">
                            <Heading>Login</Heading>
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
                                    <Button colorScheme="teal" variant="link">Create Account</Button>
                                </Center>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            </div>
        </ChakraProvider>
    );
}

export default LoginForm;
