"use client";

import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { fetchCategory, updateCategory } from '@/lib/fetchSystem/categoryService';
import { Category } from '@/interfaces';

export default function UpdateCategoryPage ({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = params.id;
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCategory = async () => {
            const categoryData = await fetchCategory(parseInt(id));
            if (!categoryData) {
                setError('Failed to fetch category details.');
            } else {
                setCategory(categoryData);
                setName(categoryData.category_name); // Assuming category_name is the property name
            }
            setLoading(false);
        };
        getCategory();
    }, [id]);

    const handleUpdate = async () => {
        setLoading(true);
        if (category) {
            const updatedCategory = { ...category, category_name: name }; // Update category_name as per your API structure
            const response = await updateCategory(updatedCategory);
            if ('error' in response) {
                setError(response.error);
            } else {
                router.push('/pages/admin/system/categories'); // Redirect to categories list after update
            }
            setLoading(false);
        }
    };

    // const handleDelete = async () => {
    //     const response = await deleteCategory(parseInt(id));
    //     if ('error' in response) {
    //         setError(response.error);
    //     } else {
    //         router.push('/pages/admin/system/categories'); // Redirect to categories list after deletion
    //     }
    // };

    if (!category) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Heading as="h1" mb={4}>Update Category: {id}</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                        )}
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" />
                    <Button colorScheme="teal" onClick={handleUpdate} isLoading={loading}>
                        Update Category
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

// export default function UpdateCategoryPage ({ params }: { params: { id: string } }) {

//     return (
//         <Box py={10} maxW="800px" mx="auto">
//             <Heading as="h1">Update Category: {params.id}</Heading>
//             {/* Implement your update form/component here */}
//         </Box>
//     );
// };
// pages/admin/system/categories/update/[id].tsx
