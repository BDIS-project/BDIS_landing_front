"use client"

import { useEffect, useState } from 'react';
import { Box, Heading, Text, Divider, Flex, Select } from '@chakra-ui/react';
import { fetchCategoriesSummary } from "@/lib/fetchStats/fetchCategoriesSummary";
import { fetchSoldEveryProduct } from "@/lib/fetchStats/fetchSoldEveryProduct";

export default function EvelinaQueries() {
    const [metric, setMetric] = useState<'revenue' | 'quantity'>('revenue'); // Default metric is 'revenue'
    const [categoriesSummary, setCategoriesSummary] = useState<any[]>([]);
    const [soldProducts, setSoldProducts] = useState<any[]>([]);

    useEffect(() => {
      const fetchSummary = async () => {
          const summaryData = await fetchCategoriesSummary(metric); // Fetch based on selected metric
          if (summaryData) {
              setCategoriesSummary(summaryData);
          }
      };

      fetchSummary();
  }, [metric]); // Runs whenever metric changes

  // useEffect to load data once when component mounts
  useEffect(() => {
      const fetchSold = async () => {
          const soldProductsData = await fetchSoldEveryProduct();
          if (soldProductsData) {
              setSoldProducts(soldProductsData);
          }
      };

      fetchSold();
  }, []); 

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMetric(event.target.value as 'revenue' | 'quantity');
  };  

    return (
      <Box bg="gray.800">

            <Heading as="h1" textAlign="center"textColor="white" mt="125px" mb="75px">
                Statistics Page
            </Heading>

            <Box bg="white" py={10} maxW="1000px" mx="auto" px="100" mb="50px" borderRadius="15px">

                <Flex justifyContent="center" mb={4}>
                    <Select value={metric} onChange={handleMetricChange} maxW="200px" bg="teal" >
                        <option value="revenue">Revenue</option>
                        <option value="quantity">Quantity</option>
                    </Select>
                </Flex>

                <Box>
                    <Heading as="h2" fontSize="xl" mb={4}>
                        Categories Summary:
                    </Heading>
                    <Flex flexDirection="column">
                        {categoriesSummary.map((category) => (
                            <Flex key={category.category_name} justifyContent="space-between" mb={2}>
                                <Text fontWeight="medium">{category.category_name}</Text>
                                <Text fontWeight="medium">{metric === 'revenue' ? `$${category.total_revenue}` : category.total_units_sold}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Box>
            <Box  bg="white" py={10} maxW="1000px" mx="auto" px="100" mb="100px" borderRadius="15px">
                <Box>
                    <Heading as="h2" fontSize="xl" mb={8}>
                        Employees who sold every product at least once:
                    </Heading>
                    <Flex flexDirection="column">
                        {soldProducts.map((employee) => (
                            <Flex key={employee.id_employee} justifyContent="space-between" mb={2}>
                                <Text fontWeight="medium">{employee.empl_surname}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}
