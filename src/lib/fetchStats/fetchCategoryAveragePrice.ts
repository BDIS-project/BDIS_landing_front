import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchCategoryAveragePrice(includePromotional: boolean): Promise<any[]> {
    try {
        console.log(`Including promotional: ${includePromotional}...`);
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<any[]> = await axios.get(
            `http://localhost:8000/api/category-average-price/?include_promotional=${includePromotional}`,
            { headers }
        );

        console.log('Fetched category average price:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching category average price:', error);
        return [];
    }
}
