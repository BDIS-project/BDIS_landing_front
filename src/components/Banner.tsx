import { Box, Image, Text, Flex } from '@chakra-ui/react';

export default function Banner () {
    return (
        <Box 
        bg="white" 
        boxShadow="md" 
        borderRadius="md" 
        overflow="hidden" 
        position="relative" 
        maxW="1200px" 
        m={10}
        mx="auto">
        <Image
              src="/images/top_display.jpg" //{product.image}
              alt="top_display"
              borderRadius="md"
            />
        </Box>
    );
  };