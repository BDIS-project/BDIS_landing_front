"use client";

import { Box, Heading, Button, Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCard from '@components/ObjectCard'; // Define ObjectCard component

import { fetchProducts } from '@/lib/fetchProducts';
import { ProductList } from '@/interfaces'; // Define StoreProduct interface based on your backend response
import { useRouter } from 'next/navigation';

export default function StoreProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<ProductList>([]);

    useEffect(() => {
        const getProducts = async () => {
            const fetchedStoreProducts = await fetchProducts();
            setProducts(fetchedStoreProducts.productList);
        };
        getProducts();
    }, []);

    const handleAddClick = () => {
        router.push('/pages/admin/system/store-products/create');
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center">
                    <Heading as="h1">Store Products</Heading>
                    <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2}>
                        Add New
                    </Button>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {products.map((product) => (
                        <ObjectCard
                            key={product.upc} 
                            objectName={`${product.product_name} | id: ${product.upc}`} 
                            tableRoute="store-products"
                            objectRoute={String(product.upc)} 
                        />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
