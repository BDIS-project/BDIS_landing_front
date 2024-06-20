"use client"

import { Spinner, Center } from '@chakra-ui/react';
import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AuthGuard({ children }: { children: ReactNode } ) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner
                    thickness="10px"
                    speed="1s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center>
        );
    }

    return <>{children}</>;
};
