import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { CheckList } from '@/interfaces';

export async function fetchChecks(period: string): Promise<{ checkList: CheckList; status: number }> {
    try {
        console.log('Fetching checks...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<CheckList> = await axios.get(
            `http://localhost:8000/api/check-overview/?period=${period}`,
            { headers }
        );

        console.log('Fetched checks:', response.data);
        return { checkList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching checks:', error);
        return { checkList: [], status: 500 };
    }
}
