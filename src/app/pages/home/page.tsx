'use client';

import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from "react";

import ProductShowcase from '@components/ProductShowcase';
import Banner from '@components/Banner';
import FilterBlock from '@components/FilterBlock';

import { fetchProducts } from "@/lib/fetchProducts";
import { fetchCategories } from "@/lib/fetchCategories";
import { ProductList, CategoryList } from "@/interfaces";

export default function Home() {
  const [products, setProducts] = useState<ProductList>([]);
  const [categories, setCategories] = useState<CategoryList>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = window.location.search;
        
        // Fetch products if not already fetched
        const productResponse = await fetchProducts(queryString);
        setProducts(productResponse.productList);
        console.log("Products fetched")

        // Fetch categories 
        const categoryResponse = await fetchCategories();
        setCategories(categoryResponse.categoryList);
        console.log("Categories fetched")


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log('i fire once');
    fetchData();
  }, [categories.length, products.length]);

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
