"use client";

import { Box, Heading, Button, VStack, Text, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCustomerCard, deleteCustomerCard } from '@/lib/fetchSystem/customerCardService';
import { CustomerCard } from '@/interfaces';

export default function DeleteCustomerCardPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const cardNumber = params.id;
    const [customerCard, setCustomerCard] = useState<CustomerCard | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCustomerCard = async () => {
            console.log(cardNumber)
            const cardData = await fetchCustomerCard(cardNumber);
            if (!cardData) {
                setError('Failed to fetch customer card details.');
            } else {
                setCustomerCard(cardData);
            }
            setLoading(false);
        };
        getCustomerCard();
    }, [cardNumber]);

    const handleDelete = async () => {
        const response = await deleteCustomerCard(cardNumber);
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/customer-cards'); // Redirect to customer cards list after deletion
        }
    };

    const handleCancel = () => {
        router.push('/pages/admin/system/customer-cards'); // Redirect to customer cards list on cancel
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!customerCard) {
        return <div>Customer card not found</div>; // Handle case where customer card is not found
    }

    return (
        <Box bg="gray.800">
            <Flex align="center">
                <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                    <VStack spacing={4} align="stretch" maxW="400px">
                        <Heading as="h1" mb={4}>Delete Customer Card: {customerCard.card_number}</Heading>
                        <Text>Are you sure you want to delete customer card {customerCard.card_number}?</Text>
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
