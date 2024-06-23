"use client";

import { Box, Heading, Button, Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCard from '@components/ObjectCard';
import { fetchBaseProducts } from '@/lib/fetchBaseProducts';
import { BaseProductList } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function BaseProductsPage() {
    const router = useRouter();
    const [baseProducts, setBaseProducts] = useState<BaseProductList>([]);

    useEffect(() => {
        const getCustomerCards = async () => {
            const fetchedBaseProducts = await fetchBaseProducts();
            if (fetchedBaseProducts) {
              setBaseProducts(fetchedBaseProducts.baseProductList);
            }
        };
        getCustomerCards();
    }, []);

    const handleAddClick = () => {
        router.push(`/pages/admin/system/products/create`);
    };

    return (
        <Box bg="gray.800">
            <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
                <Flex mb="75px" align="center">
                    <Heading as="h1">Customer Cards</Heading>
                    <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2}>
                        Add New
                    </Button>
                </Flex>
                <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                    {baseProducts.map((baseProduct) => (
                        <ObjectCard
                            key={baseProduct.id_product}
                            objectName={`${baseProduct.product_name}`}
                            tableRoute="products"
                            objectRoute={String(baseProduct.id_product)}
                        />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
