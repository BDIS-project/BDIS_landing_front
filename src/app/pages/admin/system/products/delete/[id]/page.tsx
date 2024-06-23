"use client"

import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, VStack, Text, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { fetchBaseProduct, deleteBaseProduct } from '@/lib/fetchSystem/baseProductService';
import { BaseProduct } from '@/interfaces';

export default function DeleteBaseProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const baseProductId = params.id;
    const [baseProduct, setBaseProduct] = useState<BaseProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getBaseProduct = async () => {
            console.log(baseProductId);
            const baseProductData = await fetchBaseProduct(baseProductId);
            if (!baseProductData) {
                setError('Failed to fetch base product details.');
            } else {
                setBaseProduct(baseProductData);
            }
            setLoading(false);
        };
        getBaseProduct();
    }, [baseProductId]);

    const handleDelete = async () => {
        const response = await deleteBaseProduct(baseProductId);
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/products'); // Redirect to base products list after deletion
        }
    };

    const handleCancel = () => {
        router.push('/pages/admin/system/products'); // Redirect to base products list on cancel
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!baseProduct) {
        return <div>Base product not found</div>; // Handle case where base product is not found
    }

    return (
        <Box bg="gray.800">
            <Flex align="center">
                <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                    <VStack spacing={4} align="stretch" maxW="400px">
                        <Heading as="h1" mb={4}>Delete Base Product: {baseProduct.product_name}</Heading>
                        <Text>Are you sure you want to delete base product {baseProduct.product_name}?</Text>
                        {error && (
                            <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>Error:</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button colorScheme="red" onClick={handleDelete} mt={4}>
                            Delete
                        </Button>
                        <Button colorScheme="gray" onClick={handleCancel} mt={2}>
                            Cancel
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
}
