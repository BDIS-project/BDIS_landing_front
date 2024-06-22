'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Flex, Button, Heading, Input, IconButton, Select } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { fetchProducts } from '@/lib/fetchProducts';
import { fetchCustomerCardOverview } from '@/lib/fetchCart/fetchCustomerCardOverview';
import { ProductList, CartItem, CustomerCard, CustomerCardList } from '@/interfaces';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductList>([]);
  const [customerCards, setCustomerCards] = useState<CustomerCardList>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerCard | null>(null);

  useEffect(() => {
    // Fetch cart items from session storage
    const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);

    // Fetch product details
    const fetchProductDetails = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts.productList);
    };

    // Fetch customer card overview on page load
    const fetchCustomerCards = async () => {
      const response = await fetchCustomerCardOverview();
      if (response.status === 200) {
          setCustomerCards(response.customerCardList);
      }
    };

    fetchProductDetails();
    fetchCustomerCards();
  }, []);

  const getProductById = (id: number) => {
    return products.find(product => product.upc === id);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map(item => {
        if (item.productId === productId) {
            if (newQuantity <= 0) {
                handleRemoveFromCart(productId); // Remove item if quantity is less than or equal to 0
                return item;
            } else {
                return { ...item, quantity: newQuantity };
            }
        } else {
            return item;
        }
    });

    setCartItems(updatedCartItems);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};

const handleRemoveFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCartItems);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};

const calculateTotalPrice = () => {
  let totalPrice = 0;
  cartItems.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      totalPrice += product.selling_price * item.quantity;
    }
  });
  return totalPrice.toFixed(2);
};

const calculateTotalDiscountedPrice = () => {
  if (!selectedCustomer) return calculateTotalPrice();
  const totalPrice = Number(calculateTotalPrice());
  const discount = selectedCustomer.percent;
  return (totalPrice - (totalPrice * discount / 100)).toFixed(2);
};

const handleCreateCheck = () => {
  // TODO: Implement logic to create a check based on cart items
  if (selectedCustomer) {
    const checkData = {
        cartItems,
        customerCardNumber: selectedCustomer.card_number
    };
    console.log('Creating check with data:', checkData);
    console.log(checkData)
    // Add backend call 
}
  console.log('Creating check...');
};

  return (
    <Box bg="gray.800">
      <Box bg="white" py={10} maxW="1000px" mx="auto" px="100" my="100px" borderRadius="15px">
        <Heading as="h1" my={15} pb={5}>
          Shopping cart:
        </Heading>
        <Text fontWeight="Bold">Select client account:</Text>
        <Flex mb={4} pb={10}>
        <Select placeholder="Select customer" onChange={(e) => {
                    const selectedCard = customerCards.find(card => card.card_number === e.target.value);
                    setSelectedCustomer(selectedCard || null);
                }}>
                    {customerCards.map(card => (
                        <option key={card.card_number} value={card.card_number}>
                            {`${card.cust_name} ${card.cust_surname} ${card.cust_patronymic || ''} (discount ${card.percent}%)`}
                        </option>
                    ))}
                </Select>
        </Flex>
        {cartItems.length === 0 ? (
          <Text>No items in cart</Text>
        ) : (
          <>
            {cartItems.map(item => {
              const product = getProductById(item.productId);
              if (!product) return null;
              const totalPrice = (product.selling_price * item.quantity).toFixed(2);
              return (
                <Flex key={item.productId} mb={4} alignItems="center">
                  <Box flex="1">
                    <Text fontSize="xl">{product.product_name}</Text>
                    <Text>Price per piece: ${product.selling_price.toFixed(2)}</Text>
                    <Flex alignItems="center">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        mr={2}
                        max={product.products_number}
                      />
                      <IconButton
                        aria-label="Increase quantity"
                        icon={<AddIcon />}
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        mr={2}
                        isDisabled={item.quantity >= product.products_number}
                      />
                      <IconButton
                        aria-label="Decrease quantity"
                        icon={<MinusIcon />}
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        mr={2}
                        isDisabled={item.quantity <= 1}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => handleRemoveFromCart(item.productId)}
                      >
                        Remove
                      </Button>
                    </Flex>
                    <Text>Total: ${totalPrice}</Text>
                  </Box>
                </Flex>
              );
            })}
            <Flex justifyContent="space-between" mt={8} alignItems="center">
              <Text fontWeight="semibold">Sum total: ${calculateTotalPrice()}</Text>
              <Flex alignItems="center">
                <Text fontWeight="bold" mr={4}>Price with discount: ${calculateTotalDiscountedPrice()}</Text>
                <Button colorScheme="teal" onClick={handleCreateCheck}>Create check</Button>
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
}
