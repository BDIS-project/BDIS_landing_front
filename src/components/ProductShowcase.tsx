'use client'
import { useEffect, useState } from 'react';
import { Box, Grid, Image, Text, Button, Badge, Flex } from '@chakra-ui/react';
import { ProductList } from '@/interfaces';
import Card from '@components/Card';
import SkeletonCard from '@components/SkeletonCard';

interface ProductProps {
  products: ProductList;
  loading: boolean;
}



export default function ProductShowcase({products, loading}: ProductProps) {

  return (
    <Box maxW="1200px" mx="auto">
      <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
      {loading
          ? Array.from({ length: 8 }, (_, index) => <SkeletonCard key={index} />)
          : products.map((product) => <Card key={product.id_product} product={product} />)
        }
      </Grid>
    </Box>
  );
}