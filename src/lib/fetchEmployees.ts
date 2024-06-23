import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { EmployeeList } from '@/interfaces';

export async function fetchEmployees(): Promise<{ employeeList: EmployeeList; status: number }> {
    try {
        console.log('Fetching employees overview...');
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<EmployeeList> = await axios.get(
            'http://localhost:8000/api/store-overview/?employee=true',
            { headers }
        );

        console.log('Fetched employees overview:', response.data);
        return { employeeList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching employees overview:', error);
        return { employeeList: [], status: 500 };
    }
}
