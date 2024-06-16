"use client"

import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from "react";

import ProductShowcase from '@components/ProductShowcase';
import Banner from '@components/Banner';
import FilterBlock from '@components/FilterBlock';

import { fetchProducts } from "@/lib/fetchProducts";
import { ProductList } from "@/interfaces";

export default function Home() {

  const [products, setProducts] = useState<ProductList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLarger] = useMediaQuery("(min-width: 2000px)");

  useEffect(() => {
    const queryString = window.location.search;

    fetchProducts(queryString).then((response) => {
      if (response.status == 200) {
        setProducts(response.productList);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <Box>
      <Banner />
      <Flex maxW="2000" mx="auto" py={4}>
        <Box flex="2" maxW="300px" ml={6} mr={12}>
          <FilterBlock />
        </Box>
        <Box flex="4" maxW="1250" mr={6}>
          <ProductShowcase products={products} loading={loading} />
        </Box>

      </Flex>
    </Box>
  );
};