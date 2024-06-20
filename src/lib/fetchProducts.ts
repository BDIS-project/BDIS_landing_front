import axios, { AxiosResponse } from 'axios';
import { ProductList } from '@/interfaces';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchProducts(queryString: string): Promise<{ productList: ProductList; status: number }> {
    try {
        console.log('Fetching products...');
        const token = await getAccessToken();
        //const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Unable to retrieve access token');
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const url = 'http://localhost:8000/api/store-products/' + queryString;
        const response: AxiosResponse<ProductList> = await axios.get(url, { headers });

        console.log('Fetched products:', response.data);
        return { productList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { productList: [], status: 500 };
    }
}
