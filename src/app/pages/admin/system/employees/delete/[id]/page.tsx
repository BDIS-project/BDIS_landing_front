"use client";

import { Box, Heading, Button, VStack, Text, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchEmployee, deleteEmployee } from '@/lib/fetchSystem/employeeService';
import { Employee } from '@/interfaces';

export default function DeleteEmployeePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const employeeId = params.id;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getEmployee = async () => {
            console.log(employeeId);
            const employeeData = await fetchEmployee(employeeId);
            if (!employeeData) {
                setError('Failed to fetch employee details.');
            } else {
                setEmployee(employeeData);
            }
            setLoading(false);
        };
        getEmployee();
    }, [employeeId]);

    const handleDelete = async () => {
        const response = await deleteEmployee(employeeId);
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/employees'); // Redirect to employees list after deletion
        }
    };

    const handleCancel = () => {
        router.push('/pages/admin/system/employees'); // Redirect to employees list on cancel
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!employee) {
        return <div>Employee not found</div>; // Handle case where employee is not found
    }

    return (
        <Box bg="gray.800">
            <Flex align="center">
                <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                    <VStack spacing={4} align="stretch" maxW="400px">
                        <Heading as="h1" mb={4}>Delete Employee: {employee.empl_name} {employee.empl_surname}</Heading>
                        <Text>Are you sure you want to delete employee {employee.empl_name} {employee.empl_surname}?</Text>
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
