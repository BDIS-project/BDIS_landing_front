'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Flex, Button, Heading, Input, IconButton, Select, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { fetchProducts } from '@/lib/fetchProducts';
import { fetchCreateCheck } from '@/lib/fetchCart/fetchCreateCheck';
import { fetchCustomerCardOverview } from '@/lib/fetchCart/fetchCustomerCardOverview';
import { ProductList, CartItem, CustomerCard, CustomerCardList } from '@/interfaces';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductList>([]);
  const [customerCards, setCustomerCards] = useState<CustomerCardList>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerCard | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

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

  const getProductById = (id: string) => {
    return products.find(product => String(product.upc) === id);
  };

  const handleAmountChange = (upc: string, newAmount: number) => {
    const updatedCartItems = cartItems.map(item => {
        if (item.upc === upc) {
            if (newAmount <= 0) {
                handleRemoveFromCart(upc); // Remove item if amount is less than or equal to 0
                return item;
            } else {
                return { ...item, amount: newAmount };
            }
        } else {
            return item;
        }
    });

    setCartItems(updatedCartItems);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};

const handleRemoveFromCart = (upc: string) => {
    const updatedCartItems = cartItems.filter(item => item.upc !== upc);
    setCartItems(updatedCartItems);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};

const calculateTotalPrice = () => {
  let totalPrice = 0;
  cartItems.forEach(item => {
    const product = getProductById(item.upc);
    if (product) {
      totalPrice += product.selling_price * item.amount;
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

const handleClearSessionStorage = () => {
  sessionStorage.clear();
  setCartItems([]);
};

const handleCloseAlert = () => {
  setAlert(null);
};


const handleCreateCheck = async () => {
  let checkData
  if(selectedCustomer){
    checkData = {
    client: selectedCustomer.card_number,
    sold_products: cartItems
    }
  } else{
    checkData = {
      client: undefined,
      sold_products: cartItems
      }
  }

  const response = await fetchCreateCheck(checkData);
  if ('error' in response) {
      console.error('Error creating check:', response.error);
      setAlert({ type: 'error', message: response.error });
  } else {
      console.log('Check created successfully:', response.check_number);
      setAlert({ type: 'success', message: `Check created successfully: ${response.check_number}` });
      handleClearSessionStorage();
  }
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
                <Button colorScheme="gray" onClick={handleClearSessionStorage}>Clear Cart</Button>
        </Flex>
        {alert && (
                <Alert status={alert.type} variant='subtle' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' height='200px' mb={4}>
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        {alert.type === 'success' ? 'Success' : 'Error'}
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        {alert.message}
                    </AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" onClick={handleCloseAlert} />
                </Alert>
            )}
        {cartItems.length === 0 ? (
          <Text>No items in cart</Text>
        ) : (
          <>
            {cartItems.map(item => {
              const product = getProductById(item.upc);
              if (!product) return null;
              const totalPrice = (product.selling_price * item.amount).toFixed(2);
              return (
                <Flex key={item.upc} mb={4} alignItems="center">
                  <Box flex="1">
                    <Text fontSize="xl">{product.product_name}</Text>
                    <Text>Price per piece: ${product.selling_price.toFixed(2)}</Text>
                    <Flex alignItems="center">
                      <Input
                        type="number"
                        min={1}
                        value={item.amount}
                        onChange={(e) => handleAmountChange(item.upc, parseInt(e.target.value))}
                        mr={2}
                        max={product.products_number}
                      />
                      <IconButton
                        aria-label="Increase amount"
                        icon={<AddIcon />}
                        onClick={() => handleAmountChange(item.upc, item.amount + 1)}
                        mr={2}
                        isDisabled={item.amount >= product.products_number}
                      />
                      <IconButton
                        aria-label="Decrease amount"
                        icon={<MinusIcon />}
                        onClick={() => handleAmountChange(item.upc, item.amount - 1)}
                        mr={2}
                        isDisabled={item.amount <= 1}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => handleRemoveFromCart(item.upc)}
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
