"use client"

import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react'
import { MdFaceUnlock, MdShoppingCart } from 'react-icons/md'
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Header() {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

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
          <Link href="/pages/profile" passHref> 
            <Icon 
            as={MdFaceUnlock}
            boxSize={8}
            color={isProfileHovered ? 'teal.400' : 'teal'}
            mr={6}
            mt={2}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            />
          </Link>
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
