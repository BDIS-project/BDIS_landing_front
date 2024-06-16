import axios, { AxiosResponse } from "axios";

export async function fetchCategories(): Promise<{ categoryList: string[]; status: number }> {
    try {
        console.log('Fetching categories...');
        const response: AxiosResponse<string[]> = await axios.get('http://localhost:8000/api/categories');
        console.log('Fetched categories:', response.data);
        return { categoryList: response.data, status: response.status };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { categoryList: [], status: 500 };
    }
}