// lib/fetchSystem/checkOverviewService.ts

import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { Check, CheckProductList } from '@/interfaces';

export async function fetchCheck(checkNumber: string): Promise<Check> {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<Check[]> = await axios.get(
            `http://localhost:8000/api/complete-check-overview/`,
            {
                headers,
                params: {
                    check_number: checkNumber
                }
            }
        );

        return response.data[0];
    } catch (error) {
        console.error('Error fetching check:', error);
        throw error;
    }
}

export async function fetchCheckDetails(checkNumber: string): Promise<CheckProductList> {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<CheckProductList> = await axios.get(
            `http://localhost:8000/api/complete-check-overview/`,
            {
                headers,
                params: {
                    with_details: 'true',
                    check_number: checkNumber
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching check details:', error);
        throw error;
    }
}
