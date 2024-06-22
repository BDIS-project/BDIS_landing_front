import { Box, Heading, Text, Divider, Flex, Link } from '@chakra-ui/react';

export default function UpdateCategoryPage ({ params }: { params: { id: string } }) {

    return (
        <Box py={10} maxW="800px" mx="auto">
            <Heading as="h1">Update Category: {params.id}</Heading>
            {/* Implement your update form/component here */}
        </Box>
    );
};