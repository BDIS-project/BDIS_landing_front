"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    VStack,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            localStorage.setItem('accessToken', response.data.access);
            router.push('/');  // Redirect to the dashboard or desired page
        } catch (error) {
            setError('Invalid credentials');
            console.error('Login failed', error);
        }
    };

    return (
      <Box
          minH="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="gray.50"
      >
          <Box
              w="100%"
              maxW="md"
              bg="white"
              p={8}
              boxShadow="lg"
              borderRadius="md"
              color="black"  // Explicitly setting text color
          >
              <VStack spacing={4} align="flex-start">
                  <Heading as="h1" size="xl" textAlign="center" width="100%" color="black">
                      Login
                  </Heading>
                  {error && (
                      <Alert status="error" bg="red.200">
                          <AlertIcon />
                          {error}
                      </Alert>
                  )}
                  <FormControl id="username">
                      <FormLabel color="black">Username</FormLabel>
                      <Input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder=""
                          bg="white"
                          borderColor="gray.300"
                          color="black"
                      />
                  </FormControl>
                  <FormControl id="password">
                      <FormLabel color="black">Password</FormLabel>
                      <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder=""
                          bg="white"
                          borderColor="gray.300"
                          color="black"
                      />
                  </FormControl>
                  <Button
                      colorScheme="teal"
                      width="full"
                      onClick={handleLogin}
                  >
                      Login
                  </Button>
              </VStack>
          </Box>
      </Box>
  );
};
