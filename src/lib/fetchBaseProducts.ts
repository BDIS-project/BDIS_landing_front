import axios, { AxiosResponse } from 'axios';
import { BaseProductList } from '@/interfaces';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchBaseProducts(): Promise<{ baseProductList: BaseProductList; status: number }> {
    try {
        console.log('Fetching base products...');
        const token = await getAccessToken();
        //const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<BaseProductList> = await axios.get(
            'http://localhost:8000/api/products/',
            { headers }
        );

        console.log('Fetched base products:', response.data);
        return { baseProductList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching base products:', error);
        return { baseProductList: [], status: 500 };
    }
}