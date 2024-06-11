import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import ProductShowcase from '@components/ProductShowcase';

export default function Home() {
  return (
    <Box>
      <ProductShowcase />
    </Box>
  );
};