'use client'
import { Box, Grid, Image, Text, Button, Badge, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const products = [
  {
    id: 1,
    name: 'Watermelon',
    image: '/images/watermelon.jpg',
    price: 'USD 25.00',
    rating: 4.5,
    sale: true,
  },
  {
    id: 2,
    name: 'Fresh Tomato',
    image: '/images/tomato.jpg',
    price: 'USD 30.00',
    rating: 4.0,
  },
  {
    id: 3,
    name: 'Coriander',
    image: '/images/coriander.jpg',
    price: 'USD 40.00',
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Almond Nuts',
    image: '/images/almond.jpg',
    price: 'USD 60.00',
    rating: 5.0,
    sale: true,
  },
  {
    id: 5,
    name: 'Nuts Cookies',
    image: '/images/cookies.jpg',
    price: 'USD 25.00',
    rating: 4.8,
    sale: true,
  },
  {
    id: 6,
    name: 'TM Rice',
    image: '/images/rice.jpg',
    price: 'USD 20.00',
    rating: 4.3,
  },
  {
    id: 7,
    name: 'Flower Mushroom',
    image: '/images/mushroom.jpg',
    price: 'USD 30.00',
    rating: 4.5,
  },
  {
    id: 8,
    name: 'Best Potato',
    image: '/images/potato.jpg',
    price: 'USD 20.00',
    rating: 4.1,
  },
];

export default function ProductShowcase () {
  return (
    <Box py={10} maxW="1200px" mx="auto" px={6}>
      <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
        {products.map((product) => (
          <Box key={product.id} bg="white" boxShadow="md" borderRadius="md" overflow="hidden" position="relative">
            {product.sale && (
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
              src={product.image}
              alt={product.name}
              borderRadius="md"
              p={4}
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="xl" mb={2} color="black">
                {product.name}
              </Text>
              <Flex align="center" mb={2}>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon key={i} color={i < product.rating ? 'teal.500' : 'gray.300'} />
                  ))}
              </Flex>
              <Text color="gray.600" mb={4}>
                {product.price}
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
};