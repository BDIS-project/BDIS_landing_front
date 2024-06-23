"use client"

import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, Button, VStack, Alert, AlertIcon, AlertTitle, AlertDescription, Select } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createStoreProduct } from '@/lib/fetchSystem/storeProductService';
import { fetchBaseProducts } from '@/lib/fetchBaseProducts';
import { PostStoreProduct, BaseProduct } from '@/interfaces';

export default function CreateStoreProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<PostStoreProduct>({
        UPC: '',
        id: 0,
        price: 0,
        'products-number': 0,
        'expire-date': '',
    });
    const [baseProducts, setBaseProducts] = useState<BaseProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getBaseProducts = async () => {
            const result = await fetchBaseProducts();
            if (result.status !== 200) {
                setError('Failed to fetch base products');
            } else {
                setBaseProducts(result.baseProductList);
            }
        };
        getBaseProducts();
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
        const response = await createStoreProduct(formData);
        setLoading(false);

        if ('error' in response) {
            setError(response.error);
        } else {
            router.push('/pages/admin/system/store-products'); // Redirect to store products list after creation
        }
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1000px" mx="auto" px={100} my={100} borderRadius="15px">
                <Heading as="h1" mb={4}>Create New Store Product</Heading>
                <VStack spacing={4} align="stretch" maxW="400px">
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error:</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Select
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        placeholder="Select Product"
                    >
                        {baseProducts.map((product) => (
                            <option key={product.id_product} value={product.id_product}>
                                {product.product_name}
                            </option>
                        ))}
                    </Select>
                    <Input
                        name="UPC"
                        value={formData.UPC}
                        onChange={handleInputChange}
                        placeholder="UPC"
                    />
                    <Input
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                    />
                    <Input
                        name="products-number"
                        value={formData['products-number']}
                        onChange={handleInputChange}
                        placeholder="Products Number"
                    />
                    <Input
                        name="expire-date"
                        type="date"
                        value={formData['expire-date']}
                        onChange={handleInputChange}
                        placeholder="Expire Date"
                    />
                    <Button colorScheme="teal" onClick={handleCreate} isLoading={loading}>
                        Create Store Product
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
