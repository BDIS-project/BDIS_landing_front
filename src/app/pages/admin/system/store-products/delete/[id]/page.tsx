"use client"

import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, VStack, Text, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { deleteStoreProduct, fetchStoreProduct } from '@/lib/fetchSystem/storeProductService';
import { StoreProduct } from '@/interfaces';

interface DeleteStoreProductPageProps {
    params: { upc: string };
}

export default function DeleteStoreProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const upc = params.id;

    const [storeProduct, setStoreProduct] = useState<StoreProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getStoreProduct = async () => {
            const storeProductData = await fetchStoreProduct(upc);
            if (!storeProductData) {
                setError('Failed to fetch store product details.');
            } else {
                setStoreProduct(storeProductData);
            }
            setLoading(false);
        };
        getStoreProduct();
    }, [upc]);

    const handleDelete = async () => {
        const response = await deleteStoreProduct(upc);
        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/store-products'); // Redirect to store products list after deletion
        }
    };

    const handleCancel = () => {
        router.push('/pages/admin/system/store-products'); // Redirect to store products list on cancel
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!storeProduct) {
        return <div>Store product not found</div>; // Handle case where store product is not found
    }

    return (
        <Box bg="gray.800">
            <Flex align="center">
                <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                    <VStack spacing={4} align="stretch" maxW="400px">
                        <Heading as="h1" mb={4}>Delete Store Product: {storeProduct.upc}</Heading>
                        <Text>Are you sure you want to delete store product {storeProduct.upc}?</Text>
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
};
