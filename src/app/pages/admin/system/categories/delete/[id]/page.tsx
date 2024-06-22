"use client";

import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, VStack, Text, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { fetchCategory, deleteCategory } from '@/lib/fetchSystem/categoryService';
import { Category } from '@/interfaces';

export default function DeleteCategoryPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = params.id;
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCategory = async () => {
            const categoryData = await fetchCategory(parseInt(id));
            if (!categoryData) {
                setError('Failed to fetch category details.');
            } else {
                setCategory(categoryData);
            }
            setLoading(false);
        };
        getCategory();
    }, [id]);

    const handleDelete = async () => {
        const response = await deleteCategory(parseInt(id));
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/categories'); // Redirect to categories list after deletion
        }
    };

    const handleCancel = () => {
        router.push('/pages/admin/system/categories'); // Redirect to categories list on cancel
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!category) {
        return <div>Category not found</div>; // Handle case where category is not found
    }

    return (
        <Box bg="gray.800">
            <Flex  align="center">
                <Box bg="white" py={10} maxW="1000px" mx="auto" px="100" my="100px" borderRadius="15px">
                    <VStack spacing={4} align="stretch" maxW="400px">
                    <Heading as="h1" mb={4}>Delete Category: {category.category_name}</Heading>
                        <Text>Are you sure you want to delete category {category.category_name}?</Text>
                        {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                        )}
                        <Button colorScheme="red" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button colorScheme="gray" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};
