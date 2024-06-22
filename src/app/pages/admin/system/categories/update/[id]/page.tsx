"use client";

import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { fetchCategory, updateCategory } from '@/lib/fetchSystem/categoryService';
import { Category } from '@/interfaces';

export default function UpdateCategoryPage ({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = params.id;
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const getCategory = async () => {
            if (typeof id === 'string') {
                const categoryData = await fetchCategory(parseInt(id));
                setCategory(categoryData);
                if (categoryData) {
                    setName(categoryData.category_name); // Assuming category_name is the property name
                }
            }
        };
        getCategory();
    }, [id]);

    const handleUpdate = async () => {
        setLoading(true);
        if (category) {
            const updatedCategory = { ...category, category_name: name }; // Update category_name as per your API structure
            await updateCategory(updatedCategory);
            setLoading(false);
            router.push('/pages/admin/system/categories'); // Redirect to categories list after update
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
