import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchReportData(): Promise<any> {
    try {
        console.log('Fetching report data...');
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<any> = await axios.get(
            'http://localhost:8000/api/statistics/',
            { headers }
        );

        console.log('Fetched report data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching report data:', error);
        return null;
    }
}
