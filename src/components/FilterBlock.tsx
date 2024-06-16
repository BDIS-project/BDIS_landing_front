import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  Text,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ParsedUrlQueryInput } from 'querystring';

export default function FilterBlock (){
    const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [categories, setCategories] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [sort, setSort] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = isMounted ? useRouter() : null;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleCategoryChange = (category: string) => {
    setCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(cat => cat !== category)
        : [...prevCategories, category]
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
        categories: categories.join(','),
        inStock,
        sort,
      };

      Object.keys(query).forEach(key => {
        if (query[key] === '' || query[key] === null || query[key] === undefined) {
          delete query[key];
        }
      });

      const searchParams = new URLSearchParams(query as ParsedUrlQueryInput).toString();
      router.push(`/pages/home?${searchParams}`);
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
        <Text mb={2}>Price range</Text>
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
        <Text mb={2}>Categories</Text>
        <Stack spacing={1}>
          {['Smart TV', 'Ultra HD 4K', 'Телевізор з Wi-Fi', 'Android OC', 'Full HD', '55" OLED телевізор', 'DVB-T2 ефірне мовлення', 'IPS-матриця'].map(category => (
            <Checkbox
              key={category}
              isChecked={categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              colorScheme="teal"
            >
              {category}
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
          <option value="price-asc">Price [asc]</option>
          <option value="price-desc">Price [desc]</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
        </Select>
      </Box>

      <Button colorScheme="teal" onClick={applyFilters}>
        Go!
      </Button>
    </Box>
  );
};
