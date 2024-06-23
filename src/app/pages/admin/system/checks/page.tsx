"use client";

import { Box, Heading, Button, Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCardNoUpd from '@components/ObjectCardNoUpd';
import { fetchChecks } from '@/lib/fetchChecks';
import { CheckList } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function ChecksPage() {
    const router = useRouter();
    const [checks, setChecks] = useState<CheckList>([]);

    useEffect(() => {
        const getChecks = async () => {
              const { checkList } = await fetchChecks();
              console.log(checkList)
              setChecks(checkList);
        };
        getChecks();
    }, []);

    const handleAddClick = () => {
        router.push(`/pages/admin/system/checks/create`);
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center">
                    <Heading as="h1">Checks</Heading>
                    <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2}>
                        Add New
                    </Button>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {checks.map((check) => (
                        <ObjectCardNoUpd
                            objectName={`Check Number: ${check.check_number}`}
                            tableRoute="checks"
                            objectRoute={check.check_number.toString()}
                        />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
