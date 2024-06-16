import { Box, Heading, Text, Divider, Flex, Link } from '@chakra-ui/react';

export default function Profile() {
  return (
    <Box py={10} maxW="800px" mx="auto">
      <Heading as="h1" mb={6} color="white">About Us</Heading>
      <Text fontSize="xl" mb={8} color="white">
        Welcome to Zlagoda - Your Trusted Grocery Shopping Destination
      </Text>
      <Divider mb={8}  color="white"/>
      <Text mb={6} color="white">
        <strong>Our Story</strong><br />
        Zlagoda started with a simple yet powerful idea: to redefine the grocery shopping experience. Founded in 2015 by Emily Johnson and David Smith, Zlagoda quickly gained recognition for its commitment to quality, convenience, and community.
      </Text>
      <Text mb={6} color="white">
        <strong>Our Ideology</strong><br />
        At Zlagoda, we believe that grocery shopping should be more than just a chore; it should be an enjoyable experience. We're dedicated to providing our customers with the freshest produce, the finest products, and the friendliest service, all under one roof. Our mission is to make grocery shopping not just easy, but delightful.
      </Text>
      <Text mb={6} color="white">
        <strong>Meet Our CEOs</strong><br />
        Emily Johnson - With a background in retail management and a passion for customer service, Emily co-founded Zlagoda to realize her vision of a modern, customer-centric grocery store.<br />
        David Smith - As a seasoned entrepreneur with a knack for innovation, David brings strategic vision and business acumen to Zlagoda. Together with Emily, he's driven to revolutionize the grocery industry.
      </Text>
      <Divider mb={8} color="white"/>
      <Heading as="h2" mb={6} color="white">People at Zlagoda</Heading>
      <Text mb={4} color="white">
        <strong>Emily Johnson</strong> - CEO<br />
        <strong>Email</strong>: <Link href="mailto:emily@zlagoda.com">emily@zlagoda.com</Link><br />
        <strong>Phone</strong>: (555) 123-4567
      </Text>
      <Text mb={4} color="white">
        <strong>David Smith</strong> - CEO<br />
        <strong>Email</strong>: <Link href="mailto:david@zlagoda.com">david@zlagoda.com</Link><br />
        <strong>Phone</strong>: (555) 987-6543
      </Text>
    </Box>
  );
};