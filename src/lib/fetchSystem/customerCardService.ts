import axios, { AxiosResponse } from 'axios';
import { CustomerCard, CustomerCardList, PostCustomerCard } from '@/interfaces';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchCustomerCard(cardNumber: string): Promise<CustomerCard | null> {
    try {
        console.log(`Fetching customer card with card number ${cardNumber}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<CustomerCardList> = await axios.get(`http://localhost:8000/api/customer-card-overview/`, { headers });
        console.log('Fetched customer card:', response.data);
        const customerCard = response.data.find(card => card.card_number === cardNumber);
        return customerCard || null;
    } catch (error) {
        console.error(`Error fetching customer card with card number ${cardNumber}:`, error);
        return null;
    }
}

export async function createCustomerCard(customerCard: PostCustomerCard): Promise<{ message: string } | { error: string }> {
    try {
        console.log('Creating customer card...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        console.log(customerCard)
        const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:8000/api/create-customer/', customerCard, { headers });
        console.log(response)
        console.log('Customer card created successfully');
        return response.data;
    } catch (error) {
        console.error('Error creating customer card:', error);
        return { error: 'Failed to create customer card' };
    }
}

export async function updateCustomerCard(customerCard: CustomerCard): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Updating customer card with card number ${customerCard.card_number}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/customerCard/${customerCard.card_number}/updateCustomerCard/`, customerCard, { headers });
        console.log('Customer card updated successfully');
        return response.data;
    } catch (error) {
        console.error(`Error updating customer card with card number ${customerCard.card_number}:`, error);
        return { error: 'Failed to update customer card' };
    }
}

export async function deleteCustomerCard(cardNumber: string): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Deleting customer card with card number ${cardNumber}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.delete(`http://localhost:8000/api/delete-customer/${cardNumber}/`, { headers });
        console.log('Customer card deleted successfully');
        return response.data;
    } catch (error) {
        console.error(`Error deleting customer card with card number ${cardNumber}:`, error);
        return { error: 'Failed to delete customer card' };
    }
}
