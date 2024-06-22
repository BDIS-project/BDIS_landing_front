import axios, { AxiosResponse } from 'axios';
import { CategoryList, Category } from '@/interfaces';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchCategory(id: number): Promise<Category | null> {
    try {
        console.log(`Fetching category with id ${id}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<CategoryList> = await axios.get(`http://localhost:8000/api/categories/`, { headers });
        console.log('Fetched category:', response.data);
        const category = response.data.find(cat => cat.category_number === id);
        return category || null;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
        //throw new Error('Failed to fetch category');
    }
}

export async function createCategory(category_name: string): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Creating category with name ${category_name}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/create-category/`, {'category-name': category_name}, { headers });
        console.log('Category created successfully');
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        return { error: 'Failed to create category' };
        //throw new Error('Failed to create category');
    }
}

export async function updateCategory(category: Category): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Updating category with id ${category.category_number}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/categories/${category.category_number}/updateCategory/`, category, { headers });
        console.log('Category updated successfully');
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        return { error: 'Failed to update category' };
        //throw new Error('Failed to update category');

    }
}

export async function deleteCategory(id: number): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Deleting category with id ${id}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.delete(`http://localhost:8000/api/delete-category/${id}/`, { headers });
        console.log('Category deleted successfully');
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        return { error: 'Failed to delete category' };
        //throw new Error('Failed to delete category');
    }
}