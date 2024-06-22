"use client";

import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/lib/fetchSystem/categoryService';
import { Category } from '@/interfaces';

export default function CreateCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const handleCreate = async () => {
        setLoading(true);
        await createCategory(name);
        setLoading(false);
        router.push('/pages/admin/system/categories'); // Redirect to categories list after creation
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Heading as="h1" mb={4}>Create New Category</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" />
                    <Button colorScheme="teal" onClick={handleCreate} isLoading={loading}>
                        Create Category
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
