import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchCategoriesSummary(metric: string): Promise<any> {
    try {
        console.log(`Fetching categories summary for metric: ${metric}...`);
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<any> = await axios.get(
            `http://localhost:8000/api/categories-summary/?metric=${metric}`,
            { headers }
        );

        console.log('Fetched categories summary:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories summary:', error);
        return null;
    }
}
