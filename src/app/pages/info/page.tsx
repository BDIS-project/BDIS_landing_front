import { Box, Heading, Text, Divider, Flex, Link } from '@chakra-ui/react';


export default function Info() {
  return (
    <Box py={10} maxW="800px" mx="auto">
    <Heading as="h1" mb={6} color="white">Payment and Shipping</Heading>
    <Text mb={4}>
      We offer convenient payment options to make your shopping experience smooth and hassle-free.
    </Text>
    <Text mb={6} color="white">
      For shipping, we provide fast and reliable delivery services to ensure your orders reach you in a timely manner.
    </Text>
    <Divider mb={8} color="white"/>
    <Heading as="h2" mb={6}>Payment Methods</Heading>
    <Text mb={4} color="white">
      We accept various payment methods including:
    </Text>
    <Text mb={4} color="white">
      - Credit/Debit Cards (Visa, Mastercard, American Express)
    </Text>
    <Text mb={4} color="white">
      - PayPal
    </Text>
    <Text mb={4} color="white">
      - Bank Transfer
    </Text>
    <Text mb={6} color="white">
      - Cash on Delivery (COD)
    </Text>
    <Heading as="h2" mb={6} color="white">Shipping Information</Heading>
    <Text mb={4} color="white">
      Our shipping policy includes:
    </Text>
    <Text mb={4} color="white">
      - Free shipping on orders over $50
    </Text>
    <Text mb={4} color="white">
      - Standard shipping rates apply for orders below $50
    </Text>
    <Text mb={6} color="white">
      - Expedited shipping options available for urgent orders
    </Text>
    <Text mb={4} color="white">
      For any inquiries regarding payment or shipping, feel free to contact our customer service team.
    </Text>
  </Box>
  );
};