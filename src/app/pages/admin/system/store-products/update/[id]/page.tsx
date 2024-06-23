"use client"

import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, Input, Select, Button, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { updateStoreProduct, fetchStoreProduct } from '@/lib/fetchSystem/storeProductService';
import { fetchBaseProducts } from '@/lib/fetchBaseProducts';
import { StoreProduct, BaseProduct } from '@/interfaces';

export default function UpdateStoreProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const upc = params.id;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<StoreProduct>({
        upc: '',
        id_product: 0,
        selling_price: 0,
        products_number: 0,
        expire_date: '',
        promotional_product: false,
    });
    const [baseProducts, setBaseProducts] = useState<BaseProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getStoreProductAndBaseProducts = async () => {
            const [storeProduct, baseProductsResult] = await Promise.all([
                fetchStoreProduct(upc),
                fetchBaseProducts()
            ]);

            if (!storeProduct) {
                setError('Failed to fetch store product details.');
            } else {
                setFormData(storeProduct);
            }

            if (baseProductsResult.status !== 200) {
                setError('Failed to fetch base products for dropdown.');
            } else {
                setBaseProducts(baseProductsResult.baseProductList);
            }

            setLoading(false);
        };

        getStoreProductAndBaseProducts();
    }, [upc]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        setLoading(true);
        const response = await updateStoreProduct(formData);
        setLoading(false);

        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/store-products'); // Redirect to store products list after update
        }
    };

    if (!formData) {
        return <Box>Loading...</Box>; // Handle loading state while fetching data
    }

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={100} my={100} borderRadius="15px">
                <Heading as="h1" mb={4}>Update Store Product</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Text fontWeight="semibold">
                        UPC: {formData.upc}
                    </Text>
                    <Select
                        name="id_product"
                        value={formData.id_product.toString()}
                        onChange={handleInputChange}
                        placeholder="Select Base Product"
                    >
                        {baseProducts.map((baseProduct) => (
                            <option key={baseProduct.id_product} value={baseProduct.id_product.toString()}>
                                {baseProduct.product_name}
                            </option>
                        ))}
                    </Select>
                    <Input
                        name="selling_price"
                        value={formData.selling_price.toString()}
                        onChange={handleInputChange}
                        placeholder="Selling Price"
                    />
                    <Input
                        name="products_number"
                        value={formData.products_number.toString()}
                        onChange={handleInputChange}
                        placeholder="Products Number"
                    />
                    <Input
                        name="expire_date"
                        type="date"
                        value={formData.expire_date}
                        onChange={handleInputChange}
                        placeholder="Expire Date"
                    />
                    <Button colorScheme="teal" onClick={handleUpdate} isLoading={loading}>
                        Update Store Product
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};