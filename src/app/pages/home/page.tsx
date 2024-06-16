"use client"

import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from "react";

import ProductShowcase from '@components/ProductShowcase';
import Banner from '@components/Banner';
import FilterBlock from '@components/FilterBlock';

import { fetchProducts } from "@/lib/fetchProducts";
import { fetchCategories } from "@/lib/fetchCategories";
import { ProductList } from "@/interfaces";

export default function Home() {

  const [products, setProducts] = useState<ProductList>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const queryString = window.location.search;

    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetchProducts(queryString),
          fetchCategories()
        ]);

        if (productResponse.status === 200) {
          setProducts(productResponse.productList);
          setCategories(categoryResponse.categoryList);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Banner />
      <Flex maxW="2000" mx="auto" py={4}>
        <Box flex="2" maxW="300px" ml={6} mr={12}>
          <FilterBlock categories={categories} prevQuery={window.location.search}/>
        </Box>
        <Box flex="4" maxW="1250" mr={6}>
          <ProductShowcase products={products} loading={loading} />
        </Box>

      </Flex>
    </Box>
  );
};