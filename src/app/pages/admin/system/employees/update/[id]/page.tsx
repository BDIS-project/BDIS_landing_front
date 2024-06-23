// pages/admin/system/employees/[id]/update.tsx

"use client"

import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { fetchEmployee, updateEmployee } from '@/lib/fetchSystem/employeeService';
import { Employee } from '@/interfaces';

export default function UpdateEmployeePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const employeeId = params.id;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Employee>({
        id_employee: '',
        empl_surname: '',
        empl_name: '',
        empl_patronymic: '',
        empl_role: '',
        salary: 0,
        date_of_birth: '',
        date_of_start: '',
        phone_number: '',
        city: '',
        street: '',
        zip_code: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getEmployee = async () => {
            const employeeData = await fetchEmployee(employeeId);
            if (!employeeData) {
                setError('Failed to fetch employee details.');
            } else {
                setEmployee(employeeData);
                setFormData(employeeData);
            }
            setLoading(false);
        };
        getEmployee();
    }, [employeeId]);

    const handleUpdate = async () => {
        setLoading(true);
        const response = await updateEmployee(formData);
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/employees'); // Redirect to employees list after update
        }
        setLoading(false);
    };

    if (!employee) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                <Heading as="h1" mb={4}>Update Employee: {employeeId}</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Input
                        value={formData.empl_surname}
                        onChange={(e) => setFormData({ ...formData, empl_surname: e.target.value })}
                        placeholder="Surname"
                    />
                    <Input
                        value={formData.empl_name}
                        onChange={(e) => setFormData({ ...formData, empl_name: e.target.value })}
                        placeholder="Name"
                    />
                    <Input
                        value={formData.empl_patronymic}
                        onChange={(e) => setFormData({ ...formData, empl_patronymic: e.target.value })}
                        placeholder="Patronymic"
                    />
                    <Input
                        value={formData.empl_role}
                        onChange={(e) => setFormData({ ...formData, empl_role: e.target.value })}
                        placeholder="Role"
                    />
                    <Input
                        value={formData.salary.toString()}
                        onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                        placeholder="Salary"
                    />
                    <Input
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                        placeholder="Date of Birth"
                    />
                    <Input
                        value={formData.date_of_start}
                        onChange={(e) => setFormData({ ...formData, date_of_start: e.target.value })}
                        placeholder="Date of Start"
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
                    <Button colorScheme="teal" onClick={handleUpdate} isLoading={loading}>
                        Update Employee
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
