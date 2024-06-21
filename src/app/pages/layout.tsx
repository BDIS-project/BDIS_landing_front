'use client';

// Chakra imports
import {
  Box,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
// Layout components
import Footer from '@components/Footer';
import Header from "@components/Header"
import AdminHeader from "@components/AdminHeader"
import AuthGuard from '@/components/AuthGuard';

// Custom Chakra theme
export default function AdminLayout({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <Box bg="gray.800" minH="2000px">
      <AuthGuard>
        {role === 'Manager' ? <AdminHeader /> : <Header />}
        <Box as="main" flex="1">
          {children}
        </Box>
        <Footer />
      </AuthGuard>
    </Box>
  );
}
