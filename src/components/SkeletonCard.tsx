import { Box, Text, Button, Badge } from '@chakra-ui/react';

export default function SkeletonCard(){
    return(
        <Box bg="white" boxShadow="md" borderRadius="md" overflow="hidden" position="relative">
            <Box p={4}>
            <Text fontWeight="bold" fontSize="xl" mb={2} color="black" height="24px" width="80%" bg="gray.300" borderRadius="md" />
            <Text color="gray.600" mb={4} height="18px" width="60%" bg="gray.300" borderRadius="md" />
            <Button colorScheme="teal" size="sm" height="32px" width="80%" bg="gray.300" borderRadius="md" />
            </Box>
        </Box>
        )
};

