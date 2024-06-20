import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchAllCategories(): Promise<any[]> {
    try {
        console.log('Fetching  all categories...');
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<any[]> = await axios.get(
            'http://localhost:8000/api/all-categories/',
            { headers }
        );

        console.log('Fetched all categorie:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        return [];
    }
}