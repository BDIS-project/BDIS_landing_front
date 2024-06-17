'use client';
// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
// Layout components
import Footer from '@components/Footer';
import Header from "@components/Header"
import AuthGuard from '@/components/AuthGuard';
import { PropsWithChildren, useEffect, useState } from 'react';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// Custom Chakra theme
export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const { onOpen } = useDisclosure();


  return (
    <Box bg="gray.800">
      <AuthGuard>
        <Header />
        <Box as="main" flex="1">
              {children}
        </Box>
        <Footer />
      </AuthGuard>
    </Box>
  );
}
