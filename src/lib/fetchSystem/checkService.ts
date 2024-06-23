import axios, { AxiosResponse } from 'axios';
import { CheckList, Check } from '@/interfaces';
import { getAccessToken } from '@/lib/tokenUtils';

export async function fetchCheck(check_number: string): Promise<Check | null> {
    try {
        console.log(`Fetching check with id ${check_number}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<CheckList> = await axios.get(`http://localhost:8000/api/check-overview/`, { headers });
        console.log('Fetched check:', response.data);
        const check = response.data.find(cat => cat.check_number === check_number);
        return check || null;
    } catch (error) {
        console.error('Error fetching check:', error);
        return null;
    }
}

export async function deleteCheck(check_number: string): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Deleting check with id ${check_number}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.delete(`http://localhost:8000/api/delete-check/${check_number}/`, { headers });
        console.log('Check deleted successfully');
        return response.data;
    } catch (error) {
        console.error('Error deleting check:', error);
        return { error: 'Failed to delete check' };
    }
}

//---------------------------------
//           DEPRECATED 
//---------------------------------

// export async function createCheck(check: Check): Promise<{ message: string } | { error: string }> {
//     try {
//         console.log(`Creating check with id  ${check.check_number}...`);
//         const token = await getAccessToken();
//         const headers = {
//             'Authorization': `Bearer ${token}`
//         };

//         const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/create-check/`, check, { headers });
//         console.log('Check created successfully');
//         return response.data;
//     } catch (error) {
//         console.error('Error creating check:', error);
//         return { error: 'Failed to create check' };
//         //throw new Error('Failed to create check');
//     }
// }

// export async function updateCheck(check: Check): Promise<{ message: string } | { error: string }> {
//     try {
//         console.log(`Updating check with id ${check.check_number}...`);
//         const token = await getAccessToken();
//         const headers = {
//             'Authorization': `Bearer ${token}`
//         };

//         const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/check/${check.check_number}/updateCheck/`, check, { headers });
//         console.log('Check updated successfully');
//         return response.data;
//     } catch (error) {
//         console.error('Error updating check:', error);
//         return { error: 'Failed to update check' };
//     }
// }