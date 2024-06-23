import axios, { AxiosResponse } from 'axios';
import { StoreProductList, StoreProduct, PostStoreProduct } from '@/interfaces';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchStoreProduct(upc: string): Promise<StoreProduct | null> {
    try {
        console.log('Fetching store products...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const url = `http://localhost:8000/api/only-store-product/`;
        const response: AxiosResponse<StoreProductList> = await axios.get(url, { headers });
        console.log("id: ", upc)
        console.log('Fetched store products:', response.data);
        const storeProduct = response.data.find(product => String(product.upc) === String(upc));
        console.log("found product: ", storeProduct)

        let foundProduct: StoreProduct | null = null;

        response.data.forEach(product => {
            if (product.upc === upc) {
                foundProduct = product;
            }
            else{
                console.log(upc, product.upc)
            }
        });

        return storeProduct || null;
    } catch (error) {
        console.error('Error fetching store products:', error);
        return null;
    }
}

export async function createStoreProduct(storeProduct: PostStoreProduct): Promise<{ message: string } | { error: string }> {
    try {
        console.log('Creating storeProduct...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        console.log(storeProduct)
        const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:8000/api/create-store-product/', storeProduct, { headers });
        console.log(response)
        console.log('Customer card created successfully');
        return response.data;
    } catch (error) {
        console.error('Error creating storeProduct:', error);
        return { error: 'Failed to create storeProduct' };
    }
}

export async function updateStoreProduct(storeProduct: StoreProduct): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Updating storeProduct with upc ${storeProduct.upc}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/store-products/${storeProduct.upc}/updateStoreProduct/`, storeProduct, { headers });
        console.log('Customer card updated successfully');
        return response.data;
    } catch (error) {
        console.error(`Error updating storeProduct with upc ${storeProduct.upc}:`, error);
        return { error: 'Failed to update storeProduct' };
    }
}

export async function deleteStoreProduct(upc: string): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Deleting storeProduct with upc ${upc}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.delete(`http://localhost:8000/api/delete-store-product/${upc}/`, { headers });
        console.log('Customer card deleted successfully');
        return response.data;
    } catch (error) {
        console.error(`Error deleting storeProduct with upc ${upc}:`, error);
        return { error: 'Failed to delete storeProduct' };
    }
}

