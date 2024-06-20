import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { CategoryList } from '@/interfaces';

export async function fetchCategories(): Promise<{ categoryList: CategoryList; status: number }> {
    try {
        console.log('Fetching categories...');
        const token = await getAccessToken();
        //const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<CategoryList> = await axios.get(
            'http://localhost:8000/api/categories/',
            { headers }
        );

        console.log('Fetched categories:', response.data);
        return { categoryList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { categoryList: [], status: 500 };
    }
}
