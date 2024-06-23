"use client"

import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, VStack, Text, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { fetchCheck, deleteCheck } from '@/lib/fetchSystem/checkService';
import { Check } from '@/interfaces';

export default function DeleteCheckPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = params.id;
    const [check, setCheck] = useState<Check | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCheck = async () => {
            const checkData = await fetchCheck(id);
            if (!checkData) {
                setError('Failed to fetch check details.');
            } else {
                setCheck(checkData);
            }
            setLoading(false);
        };
        getCheck();
    }, [id]);

    const handleDelete = async () => {
        const response = await deleteCheck(id);
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/checks'); // Redirect to checks list after deletion
        }
    };

    const handleCancel = () => {
        router.push('/pages/admin/system/checks'); // Redirect to checks list on cancel
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!check) {
        return <div>Check not found</div>; // Handle case where check is not found
    }

    return (
        <Box bg="gray.800">
            <Flex align="center">
                <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                    <VStack spacing={4} align="stretch" maxW="400px">
                        <Heading as="h1" mb={4}>Delete Check: {check.check_number}</Heading>
                        <Text>Are you sure you want to delete check {check.check_number}?</Text>
                        {error && (
                            <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>Error:</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button colorScheme="red" onClick={handleDelete} mt={4}>
                            Delete
                        </Button>
                        <Button colorScheme="gray" onClick={handleCancel} mt={2}>
                            Cancel
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
}
