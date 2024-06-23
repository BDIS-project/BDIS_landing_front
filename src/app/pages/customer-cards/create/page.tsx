"use client";

import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createCustomerCard } from '@/lib/fetchSystem/customerCardService';

export default function CreateCustomerCardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [customerCardData, setCustomerCardData] = useState({
        'card-number': '',
        surname: '',
        name: '',
        patronymic: '',
        phone: '',
        city: '',
        street: '',
        'zip-code': '',
        percent: 0,
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerCardData({
            ...customerCardData,
            [name]: value,
        });
    };

    const handleCreate = async () => {
        setLoading(true);
        const response = await createCustomerCard(customerCardData);
        setLoading(false);

        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/customer-cards'); // Redirect to customer cards list after creation
        }
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={100} my={100} borderRadius="15px">
                <Heading as="h1" mb={4}>Create New Customer Card</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    <Input
                        name="card-number"
                        value={customerCardData['card-number']}
                        onChange={handleInputChange}
                        placeholder="Card Number"
                    />
                    <Input
                        name="surname"
                        value={customerCardData.surname}
                        onChange={handleInputChange}
                        placeholder="Surname"
                    />
                    <Input
                        name="name"
                        value={customerCardData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <Input
                        name="patronymic"
                        value={customerCardData.patronymic}
                        onChange={handleInputChange}
                        placeholder="Patronymic"
                    />
                    <Input
                        name="phone"
                        value={customerCardData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                    />
                    <Input
                        name="city"
                        value={customerCardData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                    />
                    <Input
                        name="street"
                        value={customerCardData.street}
                        onChange={handleInputChange}
                        placeholder="Street"
                    />
                    <Input
                        name="zip-code"
                        value={customerCardData['zip-code']}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                    />
                    <Input
                        name="percent"
                        type="number"
                        value={customerCardData.percent}
                        onChange={handleInputChange}
                        placeholder="Percent"
                    />
                    <Button colorScheme="teal" onClick={handleCreate} isLoading={loading}>
                        Create Customer Card
                    </Button>
                    {error && <Box color="red">{error}</Box>}
                </VStack>
            </Box>
        </Box>
    );
}
