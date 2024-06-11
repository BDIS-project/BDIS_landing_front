import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function Header() {
  return (
    <Box bg="white" boxShadow="sm" py={4}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" px={6}>
        <Text fontSize="xl" fontWeight="bold" color="black">
          Zlagoda STORE
        </Text>
        <Flex>
          <Link href="/">
            <Button variant="link" mr={4} color="gray">
              Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="link" mr={4} color="gray">
              Shop
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="link" color="gray">
              Contact
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
