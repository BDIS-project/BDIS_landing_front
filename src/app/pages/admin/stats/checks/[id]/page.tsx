"use client"

import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { fetchCheck, fetchCheckDetails } from '@/lib/fetchExtra/fetchCheckDetails';
import { Check, CheckProductList } from '@/interfaces';


export default function CheckOverviewPage({ params }: { params: { id: string } }) {
    const checkNumber = params.id;
    const [loading, setLoading] = useState(true);
    const [check, setCheck] = useState<Check | null>(null);
    const [products, setProducts] = useState<CheckProductList | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const checkData = await fetchCheck(checkNumber);
                setCheck(checkData);

                const productData = await fetchCheckDetails(checkNumber);
                setProducts(productData);
            } catch (error) {
                setError('Failed to fetch check overview data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={8} my="100px" borderRadius="15px">
                <Heading as="h1" mb={4}>Check Overview</Heading>
                {check && (
                    <VStack spacing={4} align="stretch" maxW="400px">
                        <Text><strong>Check Number:</strong> {check.check_number}</Text>
                        <Text><strong>Print Date:</strong> {check.print_date}</Text>
                        <Text><strong>Sum Total:</strong> {check.sum_total}</Text>
                        <Text><strong>VAT:</strong> {check.vat}</Text>
                    </VStack>
                )}
                {products && (
                    <Box mt={8}>
                        <Heading as="h2" mb={4}>Products in this Check</Heading>
                        {products.map(product => (
                            <Box key={product.id_product} bg="gray.200" p={4} mb={4} borderRadius="md">
                                <Text><strong>Product ID:</strong> {product.id_product}</Text>
                                <Text><strong>Product Name:</strong> {product.product_name}</Text>
                                <Text><strong>UPC:</strong> {product.upc}</Text>
                                <Text><strong>Selling Price:</strong> {product.selling_price}</Text>
                                <Text><strong>Quantity:</strong> {product.product_number}</Text>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};
