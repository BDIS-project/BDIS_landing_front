"use client";

import { Box, Heading, Button, Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ObjectCard from '@components/ObjectCard';
import { fetchCategories } from '@/lib/fetchCategories';
import { Category } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  
  useEffect(() => {
      const getCategories = async () => {
          const { categoryList } = await fetchCategories();
          setCategories(categoryList);
      };
      getCategories();
  }, []);

  const handleAddClick = () => {
    router.push(`/pages/admin/system/categories/create`);
  };

  return (
    <Box bg="gray.800">
        <Box bg="white" py={10} maxW="1200px" mx="auto" px="100" my="100px" borderRadius="15px">
            <Flex mb="75px" align="center">
              <Heading as="h1">Categories</Heading>
              <Button colorScheme="teal" onClick={handleAddClick} ml={15} mt={2}>
                        Add New
              </Button>
            </Flex>
            <Grid templateColumns="repeat(auto-fill, minmax(600px, 1fr))" gap={6}>
                {categories.map((category) => (
                    <ObjectCard
                        objectName={category.category_name}
                        tableRoute="categories"
                        objectRoute={category.category_number.toString()}
                    />
                ))}
            </Grid>
          </Box>   
      </Box>
  );
};
