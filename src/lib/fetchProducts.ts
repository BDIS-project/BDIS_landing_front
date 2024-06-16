import axios, { AxiosResponse } from "axios";
import  { Product, ProductList } from "@/interfaces";

export async function fetchProducts(queryString: string): Promise<{ productList: ProductList; status: number }> {
    try {
        console.log('Fetching products...');
        const response: AxiosResponse<Product[]> = await axios.get('http://localhost:8000/api/products/'+ queryString);
        console.log('Fetched products:', response.data);
        return { productList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { productList: [], status: 500 };
    }
}