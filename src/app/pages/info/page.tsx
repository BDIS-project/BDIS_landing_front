import { Box, Heading, Text, Divider, Flex, Link } from '@chakra-ui/react';


export default function Info() {
  return (
    <Box py={10} maxW="800px" mx="auto">
    <Heading as="h1" mb={6}>Payment and Shipping</Heading>
    <Text mb={4}>
      We offer convenient payment options to make your shopping experience smooth and hassle-free.
    </Text>
    <Text mb={6}>
      For shipping, we provide fast and reliable delivery services to ensure your orders reach you in a timely manner.
    </Text>
    <Divider mb={8} />
    <Heading as="h2" mb={6}>Payment Methods</Heading>
    <Text mb={4}>
      We accept various payment methods including:
    </Text>
    <Text mb={4}>
      - Credit/Debit Cards (Visa, Mastercard, American Express)
    </Text>
    <Text mb={4}>
      - PayPal
    </Text>
    <Text mb={4}>
      - Bank Transfer
    </Text>
    <Text mb={6}>
      - Cash on Delivery (COD)
    </Text>
    <Heading as="h2" mb={6}>Shipping Information</Heading>
    <Text mb={4}>
      Our shipping policy includes:
    </Text>
    <Text mb={4}>
      - Free shipping on orders over $50
    </Text>
    <Text mb={4}>
      - Standard shipping rates apply for orders below $50
    </Text>
    <Text mb={6}>
      - Expedited shipping options available for urgent orders
    </Text>
    <Text mb={4}>
      For any inquiries regarding payment or shipping, feel free to contact our customer service team.
    </Text>
  </Box>
  );
};