"use client"

import { useEffect, useState } from 'react';
import { Box, Heading, Text, Input, Flex, Select, Button } from '@chakra-ui/react';

import { fetchCategoriesSummary } from "@/lib/fetchStats/fetchCategoriesSummary";
import { fetchSoldEveryProduct } from "@/lib/fetchStats/fetchSoldEveryProduct";

import { fetchCategoryAveragePrice } from "@/lib/fetchStats/fetchCategoryAveragePrice";
import { fetchAllProductsAreSold } from "@/lib/fetchStats/fetchAllProductsAreSold";

import { fetchAllCategories } from "@/lib/fetchStats/fetchAllCategories";
import { fetchCategoryProductInfo } from "@/lib/fetchStats/fetchCategoryProductInfo";

import { useRouter } from 'next/navigation';

export default function StatsQueries() {
    const router = useRouter();
    const [metric, setMetric] = useState<'revenue' | 'quantity'>('revenue'); // Default metric is 'revenue'
    const [categoriesSummary, setCategoriesSummary] = useState<any[]>([]);
    const [soldProducts, setSoldProducts] = useState<any[]>([]);

    const [includePromotional, setIncludePromotional] = useState<boolean>(true);// Default Promotional is 'true'
    const [categoryAveragePrice, setCategoryAveragePrice] = useState<any[]>([]);
    const [allProductsSold, setAllProductsSold] = useState<any[]>([]);

    const [lowerEndQuantity, setlowerEndQuantity] = useState<number>(0);// Default Promotional is 'true'
    const [categoryProductInfo, setCategoryProductInfo] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);

  // useEffect to load data once when component mounts
  useEffect(() => {
    const fetchSold = async () => {
          const soldProductsData = await fetchSoldEveryProduct();
          if (soldProductsData) {
              setSoldProducts(soldProductsData);
          }
    };
    const fetchAllSold = async () => {
        const allProductsSoldData = await fetchAllProductsAreSold();
        if (allProductsSoldData) {
            setAllProductsSold(allProductsSoldData);
        }
    };
    const fetchAllCategoriesData = async () => {
        const allCategoriesData = await fetchAllCategories();
        if (allCategoriesData) {
            setAllCategories(allCategoriesData);
        }
    };

      fetchSold();
      fetchAllSold();
      fetchAllCategoriesData();
  }, []); 

  useEffect(() => {
    const fetchSummary = async () => {
        const summaryData = await fetchCategoriesSummary(metric); // Fetch based on selected metric
        if (summaryData) {
            setCategoriesSummary(summaryData);
        }
    };

    fetchSummary();
}, [metric]); // Runs whenever metric changes

useEffect(() => {
    const fetchAveragePrice = async () => {
        const averagePriceData = await fetchCategoryAveragePrice(includePromotional);  // Fetch based on selected Promotional
        if (averagePriceData) {
            setCategoryAveragePrice(averagePriceData);
        }
    };

    fetchAveragePrice ();
}, [includePromotional]); // Runs whenever Promotional changes

useEffect(() => {
    const fetchCategoryInfo  = async () => {
        const categoryInfoData = await fetchCategoryProductInfo(lowerEndQuantity);  // Fetch based on entered lowerEndQuantity
        if (categoryInfoData) {
            setCategoryProductInfo(categoryInfoData);
        }
    };

    fetchCategoryInfo();
}, [lowerEndQuantity]); // Runs whenever lowerEndQuantity changes

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMetric(event.target.value as 'revenue' | 'quantity');
  };  

  const handlePromotionalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIncludePromotional(event.target.value === 'true');
};
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setlowerEndQuantity(Number(event.target.value));
};

const handleReportsClick = () => {
    router.push(`/pages/admin/stats/reports/`);
};


    return (
        <Box>
        <Box bg="gray.800" display="flex" flexDirection="column" alignItems="center">

        <Flex py={3} justify="space-between" mt="125px" mb="75px" maxW="1000px" width="100%" alignItems="center">
            <Heading as="h1" textColor="white">
                Statistics Page
            </Heading>
            <Button colorScheme="teal" onClick={handleReportsClick} mr={4}>
                Download Reports
            </Button>
        </Flex>
        </Box>
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
            <Box  bg="white" py={10} maxW="1000px" mx="auto" px="100px" mb="50px" borderRadius="15px">
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

            <Box bg="white" py={10} maxW="1000px" mx="auto" px="100px" mb="50px" borderRadius="15px">

                <Flex justifyContent="center" mb={4}>
                <Select value={includePromotional ? 'true' : 'false'} onChange={handlePromotionalChange} maxW="250px" bg="teal">
                        <option value="true">Include Promotional</option>
                        <option value="false">Exclude Promotional</option>
                    </Select>
                </Flex>

                <Box>
                    <Heading as="h2" fontSize="xl" mb={4}>
                        Category Average Price:
                    </Heading>
                    <Flex flexDirection="column">
                        {categoryAveragePrice.map((category) => (
                            <Flex key={category.category_name} justifyContent="space-between" mb={2}>
                                <Text fontWeight="medium">{category.category_name}</Text>
                                <Text fontWeight="medium">${category.avg_selling_price}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Box> 


            <Box bg="white" py={10} maxW="1000px" mx="auto" px="100px" mb="50px" borderRadius="15px">
                <Box>
                    <Heading as="h2" fontSize="xl" mb={8}>
                        Categories where all products are being sold:
                    </Heading>
                    <Flex flexDirection="column">
                        {allProductsSold.map((category) => (
                            <Flex key={category.category_name} justifyContent="space-between" mb={2}>
                                <Text fontWeight="medium">{category.category_name}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Box>

            <Box bg="white" py={10} maxW="1000px" mx="auto" px="100px" mb="50px" borderRadius="15px">

                <Flex justifyContent="center" mb={4}>
                    <Text fontWeight="medium">Enter Lower End Quantity:</Text>
                    <Input type="number" value={lowerEndQuantity} onChange={handleQuantityChange} />
                </Flex>

                <Box>
                    <Heading as="h2" fontSize="xl" mb={4}>
                        Category Product Info:
                    </Heading>
                    <Flex flexDirection="column">
                    {categoryProductInfo.map((info) => (
                        <Flex key={info.category_number} justifyContent="space-between" mb={2}>
                            <Text fontWeight="medium">{info.category_name}</Text>
                            <Text fontWeight="medium">Count:    {info.count}</Text>
                        </Flex>
                    ))}
                </Flex>
                </Box>
            </Box> 


            <Box bg="white" py={10} maxW="1000px" mx="auto" px="100px" mb="100px" borderRadius="15px">
                <Box>
                    <Heading as="h2" fontSize="xl" mb={4}>
                        All Categories:
                    </Heading>
                    <Flex flexDirection="column">
                    {allCategories.map((category) => (
                            <Flex key={category.category_name} justifyContent="space-between" mb={2}>
                                <Text fontWeight="medium">{category.category_name}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Box>

    );
}
