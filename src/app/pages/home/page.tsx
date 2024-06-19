"use client";

import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from "react";

import ProductShowcase from '@components/ProductShowcase';
import Banner from '@components/Banner';
import FilterBlock from '@components/FilterBlock';

import { fetchProducts } from "@/lib/fetchProducts";
import { fetchCategories } from "@/lib/fetchCategories";
import { ProductList } from "@/interfaces";

export default function Home() {
  const [products, setProducts] = useState<ProductList | null>(null); // Initialize with null
  const [categories, setCategories] = useState<string[] | null>(null); // Initialize with null
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = window.location.search;

        // Fetch products if not already fetched
        if (!products) {
          const productResponse = await fetchProducts(queryString);
          setProducts(productResponse.productList);
        }

        // Fetch categories if not already fetched
        if (!categories) {
          const categoryResponse = await fetchCategories();
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
          <FilterBlock categories={categories || []} prevQuery={window.location.search}/>
        </Box>
        <Box flex="4" maxW="1250" mr={6}>
          <ProductShowcase products={products || []} loading={loading} />
        </Box>
      </Flex>
    </Box>
  );
};
