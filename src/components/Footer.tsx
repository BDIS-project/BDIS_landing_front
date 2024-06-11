import { Box, Flex, Text } from '@chakra-ui/react';

export default function Footer () {
  return (
    <Box bg="gray.700" color="white" py={4}>
      <Flex justify="center" align="center">
        <Text>&copy; 2024 Zlagoda. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};