"use client"

import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AuthGuard({ children }: { children: ReactNode } ) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};
