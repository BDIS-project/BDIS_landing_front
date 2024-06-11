'use client'
import { useEffect, useState } from 'react';
import { Box, Grid, Image, Text, Button, Badge, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import axios from 'axios';

interface Product {
  id_product: number;
  product_name: string;
  //image: string;
  selling_price: string;
  products_number: number;
  //rating: number;
  promotional_product: boolean;
}

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/store-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box py={10} maxW="1200px" mx="auto" px={6}>
      <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
        {products.map((product) => (
          <Box key={product.id_product} bg="white" boxShadow="md" borderRadius="md" overflow="hidden" position="relative">
            {product.promotional_product && (
              <Badge
                position="absolute"
                top={2}
                right={2}
                colorScheme="white"
                borderRadius="full"
                bg="teal.700"
                px={2}
              >
                Sale
              </Badge>
            )}
            <Image
              src="/123" //{product.image}
              alt={product.product_name}
              borderRadius="md"
              p={4}
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="xl" mb={2} color="black">
                {product.product_name}
              </Text>
              <Flex align="center" mb={2}>
                <Text fontWeight="bold" fontSize="m" mb={2} color="grey">
                  {product.product_name}
                </Text>
                {/* {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon key={i} color={i < product.rating ? 'teal.500' : 'gray.300'} />
                  ))} */}
              </Flex>
              <Text color="gray.600" mb={4}>
                {product.selling_price}
              </Text>
              <Button colorScheme="teal" size="sm">
                Add to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}