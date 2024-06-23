"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Flex, Select, Button, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { CheckList, Employee } from '@/interfaces';
import { fetchAboutMe } from '@/lib/fetchExtra/fetchCashierProfile';
import { useRouter } from 'next/navigation';

export default function EmployeesPage() {
  const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [checks, setChecks] = useState<CheckList | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [period, setPeriod] = useState<string>('all'); // Default period 'all'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status } = await fetchAboutMe(period);
                if (status !== 200) {
                    setError('Failed to fetch data');
                    return;
                }
                setEmployee(data.employee[0]); // Assuming only one employee object is returned
                setChecks(data.checks);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [period]);

    const handleMoreClick = (check_number: string) => {
        router.push(`/pages/admin/stats/checks/${check_number}`);
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error:</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }



    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                <Heading as="h1" mb={4}>About Me - Cashier Profile</Heading>
                {employee && (
                    <VStack spacing={4} align="stretch" maxW="400px">
                        <Text><strong>Employee ID:</strong> {employee.id_employee}</Text>
                        <Text><strong>Name:</strong> {employee.empl_name}</Text>
                        <Text><strong>Surname:</strong> {employee.empl_surname}</Text>
                        <Text><strong>Patronymic:</strong> {employee.empl_patronymic}</Text>
                        <Text><strong>Role:</strong> {employee.empl_role}</Text>
                        <Text><strong>Salary:</strong> {employee.salary}</Text>
                        <Text><strong>Date of Birth:</strong> {employee.date_of_birth}</Text>
                        <Text><strong>Date of Start:</strong> {employee.date_of_start}</Text>
                        <Text><strong>Phone Number:</strong> {employee.phone_number}</Text>
                        <Text><strong>City:</strong> {employee.city}</Text>
                        <Text><strong>Street:</strong> {employee.street}</Text>
                        <Text><strong>ZIP Code:</strong> {employee.zip_code}</Text>
                    </VStack>
                )}
                {checks && (
                    <Box mt={8}>
                        <Flex justify="space-between" align="center" mb={4}>
                            <Heading as="h2">Checks Created by Cashier:</Heading>
                            <Select value={period} onChange={(e) => setPeriod(e.target.value)} w="200px">
                                <option value="all">All</option>
                                <option value="day">Last 24 Hours</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                                <option value="year">Last Year</option>
                            </Select>
                        </Flex>
                        {checks.map(check => (
                            <Flex key={check.check_number} justify="space-between" align="center" bg="gray.200" p={4} mb={4} borderRadius="md">
                                <Box>
                                    <Text><strong>Check Number:</strong> {check.check_number}</Text>
                                    <Text><strong>Print Date:</strong> {check.print_date}</Text>
                                    <Text><strong>Sum Total:</strong> {check.sum_total}</Text>
                                    <Text><strong>VAT:</strong> {check.vat}</Text>
                                </Box>
                                <Button colorScheme="teal" onClick={() => handleMoreClick(check.check_number)} mr={12}>
                                    More
                                </Button>
                            </Flex>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};
