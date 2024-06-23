import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchCashierTotal(cashierId: string, startDate: string, endDate: string): Promise<number | null> {
    try {
        console.log('Fetching cashier total...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ overall_total_sum: number }> = await axios.get(
            `http://localhost:8000/api/count-sold-products-by-a-cahier/?cashier_id=${cashierId}&start_date=${startDate}&end_date=${endDate}`,
            { headers }
        );
        console.log('Fetched cashier total:', response.data);
        return response.data[0].overall_total_sum;
    } catch (error) {
        console.error('Error fetching cashier total:', error);
        return null;
    }
}

export async function fetchAllCashiersTotal(startDate: string, endDate: string): Promise<number | null> {
    try {
        console.log('Fetching all cashiers total...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ overall_total_sum: number }> = await axios.get(
            `http://localhost:8000/api/count-sold-products-by-all-cahiers/?start_date=${startDate}&end_date=${endDate}`,
            { headers }
        );
        console.log('Fetched all cashiers total:', response.data);
        return response.data[0].overall_total_sum;
    } catch (error) {
        console.error('Error fetching all cashiers total:', error);
        return null;
    }
}

export async function fetchProductSoldCount(productId: string, startDate: string, endDate: string): Promise<number | null> {
    try {
        console.log('Fetching product sold count...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ total_quantity_sold: number }> = await axios.get(
            `http://localhost:8000/api/count-sold-single-product/?product_id=${productId}&start_date=${startDate}&end_date=${endDate}`,
            { headers }
        );
        console.log('Fetched product sold count:', response.data);
        return response.data[0].total_quantity_sold;
    } catch (error) {
        console.error('Error fetching product sold count:', error);
        return null;
    }
}
