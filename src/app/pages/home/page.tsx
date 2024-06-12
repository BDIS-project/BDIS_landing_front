"use client"

import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from "react";

import ProductShowcase from '@components/ProductShowcase';
import Banner from '@components/Banner';

import { fetchProducts } from "@/lib/fetchProducts";
import { ProductList } from "@/interfaces";

export default function Home() {

  const [products, setProducts] = useState<ProductList>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts().then((response) => {
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
      <ProductShowcase products={products} loading={loading}/>
    </Box>
  );
};