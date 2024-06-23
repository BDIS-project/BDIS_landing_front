import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { Employee, CheckList, AboutMeResponse } from '@/interfaces';

export async function fetchAboutMe(id?: string): Promise<{ data: AboutMeResponse; status: number }> {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }
        if (id){
            id = `?id=${id}`
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<AboutMeResponse> = await axios.get(
            `http://localhost:8000/api/about-me/${id ? id : ''}`,
            { headers }
        );

        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching about me data:', error);
        return { data: { employee: [], checks: [] }, status: 500 };
    }
}
