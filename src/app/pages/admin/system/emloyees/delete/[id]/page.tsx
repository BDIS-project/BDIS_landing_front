import { Box, Heading, Text, Divider, Flex, Link } from '@chakra-ui/react';

export default function DeleteCategoryPage ({ params }: { params: { id: string } }) {

    return (
        <Box py={10} maxW="800px" mx="auto">
            <Heading as="h1">Delete Category: {params.id}</Heading>
            {/* Implement your update form/component here */}
        </Box>
    );
};