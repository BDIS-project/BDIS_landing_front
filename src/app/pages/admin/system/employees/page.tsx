"use client";

import { Box, Heading, Button, Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCardInfo from '@components/ObjectCardInfo';
import { fetchEmployees } from '@/lib/fetchEmployees';
import { Employee, EmployeeList } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function EmployeesPage() {
    const router = useRouter();
    const [employees, setEmployees] = useState<EmployeeList>([]);

    useEffect(() => {
        const getCustomerCards = async () => {
            const fetchedEmployees = await fetchEmployees();
            if (fetchedEmployees) {
              setEmployees(fetchedEmployees.employeeList);
            }
        };
        getCustomerCards();
    }, []);

    const handleAddClick = () => {
        router.push(`/pages/admin/system/employees/create`);
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center">
                    <Heading as="h1">Employees</Heading>
                    <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2}>
                        Add New
                    </Button>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {employees.map((employee) => (
                        <ObjectCardInfo
                            key={employee.id_employee}
                            objectName={`${employee.empl_role} | ${employee.empl_surname} ${employee.empl_name} ${employee.empl_patronymic || ""}`}
                            tableRoute="employees"
                            objectRoute={employee.id_employee}
                            showParam={employee.empl_role === "Cashier"}
                        />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
