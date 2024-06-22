import { Box, Heading, Grid, Text, Divider, Flex, Link } from '@chakra-ui/react';

import TableCard from '@components/TableCard';

const tables = [
    { name: 'Employees', route: 'employees' },
    { name: 'Products', route: 'products' },
    { name: 'Store Products', route: 'store-products' },
    { name: 'Categories', route: 'categories' },
    { name: 'Checks', route: 'checks' },
    { name: 'Customer Cards', route: 'customer-cards' },
];

export default function SystemPage() {
    return (
      <Box bg="gray.800">
        <Box bg="white" py={10} maxW="1000px" mx="auto" px="100" my="100px" borderRadius="15px">
            <Heading as="h1" my={15} pb={5}>
              System Management
            </Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(385px, 1fr))" gap={6}>
                {tables.map((table) => (
                    <TableCard
                        key={table.route}
                        tableName={table.name}
                        tableRoute={table.route}
                    />
                ))}
            </Grid>
        </Box>
      </Box>
    );
};

