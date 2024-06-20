'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ParsedUrlQueryInput } from 'querystring';
import { CategoryList } from "@/interfaces";

interface FilterBlockProps {
    categories: CategoryList;
    prevQuery?: string;
  }

export default function FilterBlock ({ categories, prevQuery }: FilterBlockProps){
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [inStock, setInStock] = useState(true);
  const [sort, setSort] = useState('');

  useEffect(() => {

    // Parse query params from prevQuery and set initial state
    if (prevQuery) {
      const params = new URLSearchParams(prevQuery);

      setSearch(params.get('search') || '');
      setPriceRange([
        Number(params.get('minPrice')) || 0,
        Number(params.get('maxPrice')) || 10000,
      ]);
      setSelectedCategories(
        (params.get('categories') || '').split(',').filter(Boolean).map(Number)
      );
      setInStock(params.get('inStock') === 'true');
      setSort(params.get('sort') || '');
    }
  }, [prevQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleCategoryChange = (categoryNumber: number) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryNumber)
        ? prevCategories.filter((cat) => cat !== categoryNumber)
        : [...prevCategories, categoryNumber]
    );
  };

  const handleInStockChange = () => {
    setInStock(!inStock);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };


  const applyFilters = () => {
    if (router) {
      const query: Record<string, string | number | boolean> = {
        search,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        categories: selectedCategories.join(','),
        inStock,
        sort,
      };

      Object.keys(query).forEach(key => {
        if (query[key] === '' || query[key] === null || query[key] === undefined) {
          delete query[key];
        }
      });

      const searchParams = new URLSearchParams(query as Record<string, string>).toString();
      window.location.href = `/pages/home?${searchParams}`;
      //router.replace(`/pages/home?${searchParams}`);
    }
  };

  return (
    <Box p={4} bg="gray.100" boxShadow="md" borderRadius="md" color="black" zIndex={10}>
      <Heading size="md" mb={4}>Filters</Heading>

      <Box mb={4}>
        <Text mb={2}>Search</Text>
        <Input
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          bg="white"
          borderColor="gray.300"
        />
      </Box>

      <Box mb={4}>
        <Text mb={2}>Price range:</Text>
        <Flex align="center">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            maxW="100px"
            mr={2}
            bg="white"
            borderColor="gray.300"
          />
          <Text mr={2}>to</Text>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            maxW="100px"
            mr={2}
            bg="white"
            borderColor="gray.300"
          />
          <Text>$</Text>
        </Flex>
      </Box>

      <Box mb={4}>
        <Text mb={2}>Categories:</Text>
        <Stack spacing={1}>
          {categories.map((category) => (
            <Checkbox
              key={category.category_number}
              isChecked={selectedCategories.includes(category.category_number)}
              onChange={() => handleCategoryChange(category.category_number)}
              colorScheme="teal"
            >
              {category.category_name}
            </Checkbox>
          ))}
        </Stack>
      </Box>

      <Box mb={4}>
        <Checkbox isChecked={inStock} onChange={handleInStockChange} colorScheme="teal">
          In stock
        </Checkbox>
      </Box>

      <Box mb={4}>
        <Text mb={2}>Sort by:</Text>
        <Select value={sort} onChange={handleSortChange} bg="white" borderColor="gray.300">
          <option value="">No sorting</option>
          <option value="products-asc">Ascending names</option>
          <option value="products-desc">Descending names</option>
          <option value="price-asc">Ascending price</option>
          <option value="price-desc">Descending price</option>
          <option value="numbers-desc">Descending amount</option>
        </Select>
      </Box>

      <Button colorScheme="teal" onClick={applyFilters}>
        Go!
      </Button>
    </Box>
  );
};
