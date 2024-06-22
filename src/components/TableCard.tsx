"use client"

import React from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface TableCardProps {
    tableName: string;
    tableRoute: string;
}

export default function TableCard({ tableName, tableRoute }: TableCardProps) {
    const router = useRouter();

    const handleAddClick = () => {
        router.push(`/admin/system/${tableRoute}/create`);
    };

    const handleMoreClick = () => {
        router.push(`/admin/system/${tableRoute}`);
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            m={2}
            textAlign="center"
            boxShadow="md"
        >
            <Flex justify="space-between" align="center">
                <Text fontSize="xl" fontWeight="bold" mt={1} mr={4}>
                    {tableName}
                </Text>
                <Box>
                    <Button colorScheme="teal" onClick={handleAddClick} mr={4}>
                        +
                    </Button>
                    <Button colorScheme="blue" onClick={handleMoreClick} mr={4}>
                        More
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};
