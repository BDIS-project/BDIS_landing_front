"use client"

import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { fetchCustomerCard, updateCustomerCard } from '@/lib/fetchSystem/customerCardService';
import { CustomerCard } from '@/interfaces';

export default function UpdateCustomerCardPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const cardNumber = params.id;
    const [customerCard, setCustomerCard] = useState<CustomerCard | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<CustomerCard>({
        card_number: '',
        cust_surname: '',
        cust_name: '',
        cust_patronymic: '',
        phone_number: '',
        city: '',
        street: '',
        zip_code: '',
        percent: 0,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCustomerCard = async () => {
            const cardData = await fetchCustomerCard(cardNumber);
            if (!cardData) {
                setError('Failed to fetch customer card details.');
            } else {
                setCustomerCard(cardData);
                setFormData({
                    card_number: cardData.card_number,
                    cust_surname: cardData.cust_surname,
                    cust_name: cardData.cust_name,
                    cust_patronymic: cardData.cust_patronymic || '',
                    phone_number: cardData.phone_number,
                    city: cardData.city || '',
                    street: cardData.street || '',
                    zip_code: cardData.zip_code || '',
                    percent: cardData.percent,
                });
            }
            setLoading(false);
        };
        getCustomerCard();
    }, [cardNumber]);

    const handleUpdate = async () => {
        setLoading(true);
        const response = await updateCustomerCard(formData);
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/customer-cards'); // Redirect to customer cards list after update
        }
        setLoading(false);
    };

    if (!customerCard) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                <Heading as="h1" mb={4}>Update Customer Card: {cardNumber}</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Input
                        value={formData.cust_surname}
                        onChange={(e) => setFormData({ ...formData, cust_surname: e.target.value })}
                        placeholder="Surname"
                    />
                    <Input
                        value={formData.cust_name}
                        onChange={(e) => setFormData({ ...formData, cust_name: e.target.value })}
                        placeholder="Name"
                    />
                    <Input
                        value={formData.cust_patronymic}
                        onChange={(e) => setFormData({ ...formData, cust_patronymic: e.target.value })}
                        placeholder="Patronymic"
                    />
                    <Input
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        placeholder="Phone Number"
                    />
                    <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="City"
                    />
                    <Input
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        placeholder="Street"
                    />
                    <Input
                        value={formData.zip_code}
                        onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                        placeholder="Zip Code"
                    />
                    <Input
                        value={formData.percent.toString()}
                        onChange={(e) => setFormData({ ...formData, percent: parseInt(e.target.value) })}
                        placeholder="Percent"
                    />
                    <Button colorScheme="teal" onClick={handleUpdate} isLoading={loading}>
                        Update Customer Card
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
