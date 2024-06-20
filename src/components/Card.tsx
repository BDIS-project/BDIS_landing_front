import { Box, Text, Button, Badge, Flex, Image } from '@chakra-ui/react';
import { Product } from '@/interfaces';
import { useState } from 'react';

export default function Card({ product }: { product: Product }){
    const [imageSrc, setImageSrc] = useState(product.picture ? `/images/${product.picture}.jpg` : '/images/box.jpg');

    const handleImageError = () => {
        setImageSrc('/images/box.jpg');
    };

    return(
    <Box bg="white" boxShadow="md" maxW="350px" borderRadius="md" overflow="hidden" position="relative" p={2}>
        {product.promotional_product && (
        <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="white"
            borderRadius="full"
            bg="teal.700"
            px={2}
        >
            Sale
        </Badge>
        )}
        <Image
              src={imageSrc}
              alt={product.product_name}
              borderRadius="md"
              p={4}
              onError={handleImageError}
            />
        <Box p={4}>
        <Text fontWeight="bold" fontSize="xl" mb={1} color="black">
            {product.product_name}
        </Text>
        <Text fontWeight="bold" fontSize="m" mb={4} color="grey">
        {/* {product.cathegory} */}
        Category
        </Text>
        <Flex justifyContent="space-between" alignItems="center" mb={10}>
                {product.promotional_product 
                ? (
                    <Flex>
                        <Text color="red.600" mr={4}>
                        ${product.selling_price}
                        </Text>
                        <Text color="gray.600" as='s' mr={4}>
                        ${product.selling_price}
                        </Text>
                    </Flex>
                )
                : (
                    <Text color="gray.600" mr={4}>
                    ${product.selling_price}
                    </Text>
                )}
            <Text color="gray.500">
            {product.products_number} left
            </Text>
        </Flex>
        <Button position="absolute" bottom={4} left={4} colorScheme="teal" size="sm">
            Add to Check
        </Button>
        </Box>
    </Box>
    )
};
