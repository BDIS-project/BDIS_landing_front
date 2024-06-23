import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { AboutMeResponse } from '@/interfaces';

export async function fetchAboutMe(period: string, id?: string): Promise<{ data: AboutMeResponse; status: number }> {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        let params: any = { period }; // Start with period in params

        if (id) {
            params.id = id; // Add id to params if provided
        }

        const response: AxiosResponse<AboutMeResponse> = await axios.get('http://localhost:8000/api/about-me/', {
            headers,
            params
        });

        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching about me data:', error);
        return { data: { employee: [], checks: [] }, status: 500 };
    }
}
