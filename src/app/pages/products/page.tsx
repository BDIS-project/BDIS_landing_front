"use client";

import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, VStack, Image, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { BaseProductList } from '@/interfaces';
import { fetchBaseProducts } from '@/lib/fetchBaseProducts';

export default function ProductsPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<BaseProductList | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageSources, setImageSources] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { baseProductList, status } = await fetchBaseProducts();
                if (status !== 200) {
                    setError('Failed to fetch products');
                    return;
                }
                setProducts(baseProductList);
                const initialImageSources = baseProductList.reduce((acc, product) => {
                    acc[product.id_product] = product.picture ? `/images/${product.picture}.jpg` : '/images/box.jpg';
                    return acc;
                }, {} as { [key: string]: string });
                setImageSources(initialImageSources);
            } catch (error) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleImageError = (id: string) => {
        setImageSources(prevState => ({
            ...prevState,
            [id]: '/images/box.jpg'
        }));
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error:</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <Box bg="gray.800" minH="100vh">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                <Heading as="h1" mb={4}>Products</Heading>
                {products && (
                    <VStack spacing={4} align="stretch">
                        {products.map(product => (
                            <Flex key={product.id_product} bg="gray.200" p={4} mb={4} borderRadius="md">
                                <Image
                                    src={imageSources[product.id_product]}
                                    alt={product.product_name}
                                    borderRadius="30%"
                                    p={4}
                                    mr={6}
                                    onError={() => handleImageError(product.id_product)}
                                    maxW="120px"
                                />
                                <Box>
                                    <Text><strong>ID:</strong> {product.id_product}</Text>
                                    <Text><strong>Category Number:</strong> {product.category_number}</Text>
                                    <Text><strong>Name:</strong> {product.product_name}</Text>
                                    <Text><strong>Characteristics:</strong> {product.characteristics}</Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                )}
            </Box>
        </Box>
    );
}
