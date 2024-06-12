import { Box, Text, Button, Badge } from '@chakra-ui/react';
import { Product } from '@/interfaces';

export default function Card({ product }: { product: Product }){
    return(
    <Box bg="white" boxShadow="md" borderRadius="md" overflow="hidden" position="relative">
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
        <Box p={4}>
        <Text fontWeight="bold" fontSize="xl" mb={2} color="black">
            {product.product_name}
        </Text>
        <Text color="gray.600" mb={4}>
            ${product.selling_price}
        </Text>
        <Button colorScheme="teal" size="sm">
            Add to Cart
        </Button>
        </Box>
    </Box>
    )
};
