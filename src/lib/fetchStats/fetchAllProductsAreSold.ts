import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchAllProductsAreSold(): Promise<any> {
    try {
        console.log('Fetching all product sold data...');
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<any> = await axios.get(
            'http://localhost:8000/api/all-products-are-sold/',
            { headers }
        );

        console.log('Fetched all product sold data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all product sold data:', error);
        return null;
    }
}
