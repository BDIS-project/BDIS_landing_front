import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchCategoryProductInfo(lowerEndQuantity?: number): Promise<any[]> {
    try {
        console.log(`Lower end quantity: ${lowerEndQuantity}...`);
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<any[]> = await axios.get(
            `http://localhost:8000/api/category-products-info/?lower_end_quantity=${lowerEndQuantity}`,
            { headers }
        );

        console.log('Fetched category product info:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching category product info:', error);
        return [];
    }
}
