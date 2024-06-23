"use client";

import { Box, Heading, Button, Flex, Grid, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCardInfo from '@components/ObjectCardInfo';
import { fetchEmployees } from '@/lib/fetchEmployees';
import { Employee, EmployeeList } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function EmployeesPage() {
    const router = useRouter();
    const [employees, setEmployees] = useState<EmployeeList>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<EmployeeList>([]);
    const [roles, setRoles] = useState<string[]>(['All']);
    const [selectedRole, setSelectedRole] = useState<string>('All');

    useEffect(() => {
        const getEmployees = async () => {
            const fetchedEmployees = await fetchEmployees();
            if (fetchedEmployees) {
                const employeeList = fetchedEmployees.employeeList;
                setEmployees(employeeList);
                setFilteredEmployees(employeeList);

                const uniqueRoles = Array.from(new Set(employeeList.map(employee => employee.empl_role)));
                setRoles(['All', ...uniqueRoles]);
            }
        };
        getEmployees();
    }, []);

    const handleAddClick = () => {
        router.push(`/pages/admin/system/employees/create`);
    };

    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const role = event.target.value;
        setSelectedRole(role);
        const fetchedEmployees = await fetchEmployees(role);
        if (fetchedEmployees) {
            setFilteredEmployees(fetchedEmployees.employeeList);
        }
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center" justify="space-between">
                    <Heading as="h1">Employees</Heading>
                    <Flex>
                        <Select value={selectedRole} onChange={handleRoleChange} mr={10} mt={2}>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </Select>
                        <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2} minW="100px">
                            Add New
                        </Button>
                    </Flex>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {filteredEmployees.map((employee) => (
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
