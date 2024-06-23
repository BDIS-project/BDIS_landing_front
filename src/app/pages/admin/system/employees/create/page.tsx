// pages/admin/system/employees/create.tsx

"use client";

import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createEmployee } from '@/lib/fetchSystem/employeeService';
import { PostEmployee } from '@/interfaces';

export default function CreateEmployeePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState<PostEmployee>({
        id: '',
        surname: '',
        name: '',
        patronymic: '',
        role: '',
        salary: 0,
        birth: '',
        start: '',
        phone: '',
        city: '',
        street: '',
        'zip-code': '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    const handleCreate = async () => {
        setLoading(true);
        const response = await createEmployee(employeeData);
        setLoading(false);

        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/employees'); // Redirect to employees list after creation
        }
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={100} my={100} borderRadius="15px">
                <Heading as="h1" mb={4}>Create New Employee</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    <Input
                        name="id"
                        value={employeeData.id}
                        onChange={handleInputChange}
                        placeholder="Employee ID"
                    />
                    <Input
                        name="surname"
                        value={employeeData.surname}
                        onChange={handleInputChange}
                        placeholder="Surname"
                    />
                    <Input
                        name="name"
                        value={employeeData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <Input
                        name="patronymic"
                        value={employeeData.patronymic}
                        onChange={handleInputChange}
                        placeholder="Patronymic"
                    />
                    <Input
                        name="role"
                        value={employeeData.role}
                        onChange={handleInputChange}
                        placeholder="Role"
                    />
                    <Input
                        name="salary"
                        type="number"
                        value={employeeData.salary}
                        onChange={handleInputChange}
                        placeholder="Salary"
                    />
                    <Input
                        name="birth"
                        type="date"
                        value={employeeData.birth}
                        onChange={handleInputChange}
                        placeholder="Date of Birth"
                    />
                    <Input
                        name="start"
                        type="date"
                        value={employeeData.start}
                        onChange={handleInputChange}
                        placeholder="Date of Start"
                    />
                    <Input
                        name="phone"
                        value={employeeData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                    />
                    <Input
                        name="city"
                        value={employeeData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                    />
                    <Input
                        name="street"
                        value={employeeData.street}
                        onChange={handleInputChange}
                        placeholder="Street"
                    />
                    <Input
                        name="zip-code"
                        value={employeeData['zip-code']}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                    />
                    {error && <Box color="red">{error}</Box>}
                    <Button colorScheme="teal" onClick={handleCreate} isLoading={loading}>
                        Create Employee
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
