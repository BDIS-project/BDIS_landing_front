import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { CreateCheckData } from '@/interfaces';

export async function fetchCreateCheck(data: CreateCheckData): Promise<{ message: string; check_number: string } | { error: string }> {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const response: AxiosResponse<{ message: string; check_number: string }> = await axios.post(
            'http://localhost:8000/api/create-check/',
            data,
            { headers }
        );

        return response.data;
    } catch (error) {
        console.error('Error creating check:', error);
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        return { error: 'An unexpected error occurred' };
    }
}