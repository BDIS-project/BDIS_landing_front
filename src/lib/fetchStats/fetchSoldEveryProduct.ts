import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchSoldEveryProduct(): Promise<any> {
    try {
        console.log('Fetching sold every product data...');
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<any> = await axios.get(
            'http://localhost:8000/api/sold-every-product/',
            { headers }
        );

        console.log('Fetched sold every product data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching sold every product data:', error);
        return null;
    }
}
