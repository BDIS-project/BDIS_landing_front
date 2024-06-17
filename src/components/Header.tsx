"use client"

import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Icon, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverArrow, 
  PopoverCloseButton, 
  PopoverHeader, 
  PopoverBody  
} from '@chakra-ui/react';

import { MdFaceUnlock, MdShoppingCart } from 'react-icons/md'
import { useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');

    if (token && storedUsername && storedRole) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setRole(storedRole);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (token) {
        await axios.post('http://localhost:8000/api/logout/', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      setIsAuthenticated(false);
      setUsername(null);
      setRole(null);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <Box bg="white" boxShadow="sm" py={4}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" px={6}>
        <Text fontSize="xl" fontWeight="bold" color="teal">
          Zlagoda
        </Text>
        <Flex>
          <Link href="/pages/about">
            <Button variant="link" color="black">
              About us
            </Button>
          </Link>
          <Link href="/pages/home">
            <Button variant="link" mx={12} color="black" fontSize="xl">
              STORE
            </Button>
          </Link>
          <Link href="/pages/info">
            <Button variant="link" color="black">
              Shipping 
            </Button>
          </Link>
        </Flex>
        <Flex alignItems="center">
          <Popover>
            <PopoverTrigger>
              <Icon
                as={MdFaceUnlock}
                boxSize={8}
                color={isProfileHovered ? 'teal.400' : 'teal'}
                mr={6}
                mt={2}
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
                cursor="pointer"
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                {isAuthenticated ? `Hi, ${username}!` : 'Welcome!'}
              </PopoverHeader>
              <PopoverBody>
                {isAuthenticated ? (
                  <>
                    <Text>{`Role: ${role}`}</Text>
                    <Button colorScheme="teal" mt={2} onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" passHref>
                    <Button colorScheme="teal">Login</Button>
                  </Link>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Link href="/pages/cart" passHref>
            <Icon
              as={MdShoppingCart}
              boxSize={8}
              color={isCartHovered ? 'teal.400' : 'teal'}
              mt={2}
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}