import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { CustomerCardList } from '@/interfaces';

export async function fetchCustomerCardOverview(): Promise<{ customerCardList: CustomerCardList; status: number }> {
    try {
        console.log('Fetching customer card overview...');
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<CustomerCardList> = await axios.get(
            'http://localhost:8000/api/customer-card-overview/',
            { headers }
        );

        console.log('Fetched customer card overview:', response.data);
        return { customerCardList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching customer card overview:', error);
        return { customerCardList: [], status: 500 };
    }
}
