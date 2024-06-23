// pages/admin/system/products/create.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, Button, VStack, Alert, AlertIcon, AlertTitle, AlertDescription, Select } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createBaseProduct } from '@/lib/fetchSystem/baseProductService';
import { fetchCategories } from '@/lib/fetchCategories'
import { PostBaseProduct, CategoryList, Category } from '@/interfaces';

export default function CreateProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<PostBaseProduct>({
        'id-product': '',
        'category-number': 0,
        name: '',
        characteristics: '',
        picture: '',
    });
    const [categories, setCategories] = useState<CategoryList>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCategories = async () => {
            const result = await fetchCategories();
            if (result.status !== 200) {
                setError('Failed to fetch categories');
            } else {
                setCategories(result.categoryList);
            }
        };
        getCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreate = async () => {
        setLoading(true);
        const response = await createBaseProduct(formData);
        setLoading(false);

        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/products'); // Redirect to products list after creation
        }
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={100} my={100} borderRadius="15px">
                <Heading as="h1" mb={4}>Create New Product</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                    <Select
                        name="category-number"
                        value={formData['category-number']}
                        onChange={handleInputChange}
                        placeholder="Select Category"
                    >
                        {categories.map((category: Category) => (
                            <option key={category.category_number} value={category.category_number}>
                                {category.category_name}
                            </option>
                        ))}
                    </Select>
                    <Input
                        name="characteristics"
                        value={formData.characteristics}
                        onChange={handleInputChange}
                        placeholder="Characteristics"
                    />
                    <Input
                        name="picture"
                        value={formData.picture}
                        onChange={handleInputChange}
                        placeholder="Picture URL"
                    />
                    <Button colorScheme="teal" onClick={handleCreate} isLoading={loading}>
                        Create Product
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
