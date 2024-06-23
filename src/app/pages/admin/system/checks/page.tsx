"use client";

import { Box, Heading, Button, Flex, Grid, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCardNoUpdMore from '@components/ObjectCardNoUpdMore';
import { fetchChecks } from '@/lib/fetchChecks';
import { CheckList } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function ChecksPage() {
    const router = useRouter();
    const [checks, setChecks] = useState<CheckList>([]);
    const [period, setPeriod] = useState<string>('all'); // Default period 'all'

    useEffect(() => {
        const getChecks = async () => {
            const { checkList } = await fetchChecks(period);
            setChecks(checkList);
        };
        getChecks();
    }, [period]); // Fetch checks whenever period changes

    const handleAddClick = () => {
        router.push(`/pages/admin/system/checks/create`);
    };

    const handlePeriodChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPeriod = event.target.value;
        setPeriod(selectedPeriod);
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center" justify="space-between">
                    <Heading as="h1">Checks</Heading>
                    <Flex>
                        <Select value={period} onChange={handlePeriodChange} mr={10} mt={2}>
                            <option value="all">All</option>
                            <option value="day">Last 24 Hours</option>
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="year">Last Year</option>
                        </Select>
                        <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2} minW="100px">
                            Add New
                        </Button>
                    </Flex>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {checks.map((check) => (
                        <ObjectCardNoUpdMore
                            key={check.check_number}
                            objectName={`Check Number: ${check.check_number}`}
                            tableRoute="checks"
                            objectRoute={check.check_number.toString()}
                            showParam={true}
                        />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
