// pages/admin/system/products/update.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, VStack, Alert, AlertIcon, AlertTitle, AlertDescription, Select } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { updateBaseProduct, fetchBaseProduct } from '@/lib/fetchSystem/baseProductService';
import { fetchCategories } from '@/lib/fetchCategories'
import { BaseProduct, Category, CategoryList } from '@/interfaces';

export default function UpdateProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const productId = params.id;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<BaseProduct>({
        id_product: '',
        category_number: 0,
        product_name: '',
        characteristics: '',
        picture: '',
    });
    const [categories, setCategories] = useState<CategoryList>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProductAndCategories = async () => {
            const [product, categoriesResult] = await Promise.all([
                fetchBaseProduct(productId),
                fetchCategories()
            ]);

            if (!product) {
                setError('Failed to fetch product details.');
            } else {
                setFormData(product);
            }

            if (categoriesResult.status !== 200) {
                setError('Failed to fetch categories.');
            } else {
                setCategories(categoriesResult.categoryList);
            }

            setLoading(false);
        };

        getProductAndCategories();
    }, [productId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        setLoading(true);
        const response = await updateBaseProduct(formData);
        setLoading(false);

        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/products'); // Redirect to products list after update
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={100} my={100} borderRadius="15px">
                <Heading as="h1" mb={4}>Update Product</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Input
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                    <Select
                        name="category_number"
                        value={formData.category_number}
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
                    <Button colorScheme="teal" onClick={handleUpdate} isLoading={loading}>
                        Update Product
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
