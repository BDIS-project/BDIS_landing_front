"use client";

import { Box, Heading, Button, Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCardNoDel from '@components/ObjectCardNoDel';
import { fetchCustomerCardOverview } from '@/lib/fetchCart/fetchCustomerCardOverview';
import { CustomerCard, CustomerCardList } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function CustomerCardsPage() {
    const router = useRouter();
    const [customerCards, setCustomerCards] = useState<CustomerCardList>([]);

    useEffect(() => {
        const getCustomerCards = async () => {
            const fetchedCustomerCards = await fetchCustomerCardOverview();
            if (fetchedCustomerCards) {
                setCustomerCards(fetchedCustomerCards.customerCardList);
            }
        };
        getCustomerCards();
    }, []);

    const handleAddClick = () => {
        router.push(`/pages/admin/system/customer-cards/create`);
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center">
                    <Heading as="h1">Customer Cards</Heading>
                    <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2}>
                        Add New
                    </Button>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {customerCards.map((customerCard) => (
                        <ObjectCardNoDel
                            key={customerCard.card_number}
                            objectName={`${customerCard.cust_surname} ${customerCard.cust_name} ${customerCard.cust_patronymic || ""}`}
                            tableRoute="customer-cards"
                            objectRoute={customerCard.card_number}
                        />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
