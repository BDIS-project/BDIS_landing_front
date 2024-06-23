"use client";

import { Box, Heading, Button, Flex, Grid, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCard from '@components/ObjectCard';
import { fetchCustomers } from '@/lib/fetchCustomers';
import { CustomerCard, CustomerCardList } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function CustomerCardsPage() {
    const router = useRouter();
    const [customerCards, setCustomerCards] = useState<CustomerCardList>([]);
    const [filteredCustomerCards, setFilteredCustomerCards] = useState<CustomerCardList>([]);
    const [percentages, setPercentages] = useState<string[]>(['All']);
    const [selectedPercent, setSelectedPercent] = useState<string>('All');

    useEffect(() => {
        const getCustomerCards = async () => {
            const fetchedCustomerCards = await fetchCustomers();
            if (fetchedCustomerCards) {
                const customerCardList = fetchedCustomerCards.customerCardList;
                setCustomerCards(customerCardList);
                setFilteredCustomerCards(customerCardList);

                const uniquePercents = Array.from(new Set(customerCardList.map(card => card.percent.toString())));
                setPercentages(['All', ...uniquePercents]);
            }
        };
        getCustomerCards();
    }, []);

    const handleAddClick = () => {
        router.push(`/pages/admin/system/customer-cards/create`);
    };

    const handlePercentChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const percent = event.target.value;
        setSelectedPercent(percent);
        const fetchedCustomerCards = await fetchCustomers(percent);
        if (fetchedCustomerCards) {
            setFilteredCustomerCards(fetchedCustomerCards.customerCardList);
        }
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center" justify="space-between">
                    <Heading as="h1">Customer Cards</Heading>
                    <Flex>
                        <Select value={selectedPercent} onChange={handlePercentChange} mr={10} mt={2}>
                            {percentages.map(percent => (
                                <option key={percent} value={percent}>
                                    {percent === 'All' ? 'All' : `${percent}%`}
                                </option>
                            ))}
                        </Select>
                        <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2} minW="100px">
                            Add New
                        </Button>
                    </Flex>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {filteredCustomerCards.map((customerCard) => (
                        <ObjectCard
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
