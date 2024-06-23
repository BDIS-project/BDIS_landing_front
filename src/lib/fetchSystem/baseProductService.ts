import axios, { AxiosResponse } from 'axios';
import { BaseProduct, BaseProductList, PostBaseProduct } from '@/interfaces';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchBaseProduct(id: string): Promise<BaseProduct | null> {
    try {
        console.log('Fetching base products...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        console.log(id)
        const response: AxiosResponse<BaseProductList> = await axios.get(
            'http://localhost:8000/api/products/',
            { headers }
        );
        
        console.log('Fetched base product:', response.data);
        const baseProduct = response.data.find(card => card.id_product === id);
        console.log(baseProduct)
        return baseProduct || null;
    } catch (error) {
        console.error('Error fetching base products:', error);
        return null;
    }
}

export async function createBaseProduct(baseProduct: PostBaseProduct): Promise<{ message: string } | { error: string }> {
    try {
        console.log('Creating baseProduct...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        console.log(baseProduct)
        const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:8000/api/create-product/', baseProduct, { headers });
        console.log(response)
        console.log('Customer card created successfully');
        return response.data;
    } catch (error) {
        console.error('Error creating baseProduct:', error);
        return { error: 'Failed to create baseProduct' };
    }
}

export async function updateBaseProduct(baseProduct: BaseProduct): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Updating baseProduct with id ${baseProduct.id_product}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/products/${baseProduct.id_product}/updateProduct/`, baseProduct, { headers });
        console.log('Customer card updated successfully');
        return response.data;
    } catch (error) {
        console.error(`Error updating baseProduct with id ${baseProduct.id_product}:`, error);
        return { error: 'Failed to update baseProduct' };
    }
}

export async function deleteBaseProduct(id: string): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Deleting baseProduct with id ${id}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.delete(`http://localhost:8000/api/delete-product/${id}/`, { headers });
        console.log('Customer card deleted successfully');
        return response.data;
    } catch (error) {
        console.error(`Error deleting baseProduct with id ${id}:`, error);
        return { error: 'Failed to delete baseProduct' };
    }
}
