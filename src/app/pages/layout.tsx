// Chakra imports
import {
  Box,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
// Layout components
import Footer from '@components/Footer';
import Header from "@components/Header"
import AuthGuard from '@/components/AuthGuard';

// Custom Chakra theme
export default function AdminLayout({ children }: { children: ReactNode }) {

  return (
    <Box bg="gray.800" minH="2000px">
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
