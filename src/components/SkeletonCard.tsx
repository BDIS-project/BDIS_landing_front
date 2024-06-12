import { Box, Text, Button, Badge, Flex, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';

export default function SkeletonCard(){
    return(
        <Box bg="white" boxShadow="md" borderRadius="md" overflow="hidden" position="relative" p={2} >
        <Skeleton height="245px" borderRadius="md" p={4} startColor="gray.200" endColor="gray.400" />
        <Box p={4}>
          <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="20px" mb={1} startColor="gray.200" endColor="gray.400" />
          <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="20px" mb={4} width="60%" startColor="gray.200" endColor="gray.400" />
          <Flex justifyContent="space-between" alignItems="center" mb={5}>
            <Flex>
              <Skeleton height="20px" width="40px" mr={4} startColor="gray.200" endColor="gray.400" />
              <Skeleton height="20px" width="40px" startColor="gray.200" endColor="gray.400" />
            </Flex>
            <Skeleton height="20px" width="50px" startColor="gray.200" endColor="gray.400" />
          </Flex>
          <Skeleton height="30px" width="100px" startColor="gray.200" endColor="gray.400" />
        </Box>
      </Box>
        )
};

