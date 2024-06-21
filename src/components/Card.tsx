'use client';

import { Box, Text, Button, Badge, Flex, Image, Input, IconButton  } from '@chakra-ui/react';
import { Product } from '@/interfaces';
import { useState, useEffect } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons'; 
import { CartItem } from '@/interfaces';

export default function Card({ product }: { product: Product }){
    const [imageSrc, setImageSrc] = useState(product.picture ? `/images/${product.picture}.jpg` : '/images/box.jpg');
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        setRole(storedRole);
      }

      const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      const storedCartItem = storedCartItems.find((item: { productId: string }) => item.productId === product.upc.toString());
  
      if (storedCartItem) {
        setIsAddingToCart(true);
        setQuantity(storedCartItem.quantity);
      }
    }, []);

    const handleImageError = () => {
        setImageSrc('/images/box.jpg');
    };

    const handleAddToCartClick = () => {
        setIsAddingToCart(true);
        addToCart(1);
      };

    const handleEditClick = () => {
        window.location.href = `/admin/system/storeproducts/update/${product.upc}`;
    };

    const handleDeleteClick = () => {
        window.location.href = `/admin/system/storeproducts/delete/${product.upc}`;
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        if (newQuantity > 0) {
          updateCart(newQuantity);
        } else {
          removeFromCart();
        }
      };

      const addToCart = (quantity: number) => {
        const cartItem: CartItem = {
          productId: product.upc,
          quantity: quantity,
        };

        let cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
        const existingItemIndex = cartItems.findIndex((item: { productId: number }) => item.productId === product.upc);
    
        if (existingItemIndex >= 0) {
          cartItems[existingItemIndex].quantity += quantity;
        } else {
          cartItems.push(cartItem);
        }
    
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      };
    
      const updateCart = (quantity: number) => {
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
        const itemIndex = cartItems.findIndex((item: { productId: number }) => item.productId === product.upc);
    
        if (itemIndex >= 0) {
          cartItems[itemIndex].quantity = quantity;
          sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
      };
    
      const removeFromCart = () => {
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
        cartItems = cartItems.filter((item: { productId: number }) => item.productId !== product.upc);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        setIsAddingToCart(false);
        setQuantity(1);
      };

      return (
        <Box bg="white" boxShadow="md" maxW="350px" borderRadius="md" overflow="hidden" position="relative" p={2}>
          {product.promotional_product && (
            <Badge
              position="absolute"
              top={4}
              right={4}
              colorScheme="white"
              borderRadius="full"
              bg="teal.700"
              px={2}
            >
              Sale
            </Badge>
          )}
          <Image
            src={imageSrc}
            alt={product.product_name}
            borderRadius="md"
            p={4}
            onError={handleImageError}
          />
          <Box p={4}>
            <Text fontWeight="bold" fontSize="xl" mb={1} color="black">
              {product.product_name}
            </Text>
            <Text fontWeight="bold" fontSize="m" mb={4} color="grey">
              {product.category_name}
            </Text>
            <Flex justifyContent="space-between" alignItems="center" mb={10}>
              {product.promotional_product ? (
                <Flex>
                  <Text color="red.600" mr={4}>
                    ${product.selling_price}
                  </Text>
                  <Text color="gray.600" as='s' mr={4}>
                    ${product.original_price}
                  </Text>
                </Flex>
              ) : (
                <Text color="gray.600" mr={4}>
                  ${product.selling_price}
                </Text>
              )}
              <Text color="gray.500">
                {product.products_number} left
              </Text>
            </Flex>
            {!isAddingToCart ? (
              role === 'Manager' ? (
                <Flex>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    position="absolute"
                    bottom={4}
                    left={4}
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    position="absolute"
                    bottom={4}
                    right={4}
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </Button>
                </Flex>
              ) : (
                <Button
                  colorScheme="teal"
                  size="sm"
                  position="absolute"
                  bottom={4}
                  left={4}
                  onClick={handleAddToCartClick}
                >
                  Add to Cart
                </Button>
              )
            ) : (
              <Flex alignItems="center">
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  mr={2}
                  max={product.products_number}
                />
                <IconButton
                  aria-label="Increase quantity"
                  icon={<AddIcon />}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  mr={2}
                  isDisabled={quantity >= product.products_number}
                />
                <IconButton
                  aria-label="Decrease quantity"
                  icon={<MinusIcon />}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  mr={2}
                  isDisabled={quantity <= 0}
                />
              </Flex>
            )}
          </Box>
        </Box>
      );
    }