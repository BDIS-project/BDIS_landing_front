"use client"

import React from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface ObjectCardProps {
    objectName: string;
    tableRoute: string;
    objectRoute: string;
}

export default function TableCard({ objectName, tableRoute, objectRoute }: ObjectCardProps) {
    const router = useRouter();

    const handleUpdateClick = () => {
        router.push(`/pages/admin/system/${tableRoute}/update/${objectRoute}`);
    };

    const handleDeleteClick = () => {
        router.push(`/pages/admin/system/${tableRoute}/delete/${objectRoute}`);
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
                    {objectName}
                </Text>
                <Box>
                    <Button colorScheme="gray" onClick={handleUpdateClick} mr={4}>
                        Update
                    </Button>
                    <Button colorScheme="red" onClick={handleDeleteClick} mr={4}>
                        Delete
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};
