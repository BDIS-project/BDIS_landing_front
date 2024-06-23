import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenUtils';
import { Employee, EmployeeList, PostEmployee } from '@/interfaces';

export async function fetchEmployee(id: string): Promise<Employee | null> {
    try {
        console.log(`Fetching employee with id ${id}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<EmployeeList> = await axios.get(
            'http://localhost:8000/api/store-overview/?employee=true',
            { headers }
        );

        console.log('Fetched employee overview:', response.data);
        const employee = response.data.find(card => card.id_employee === id);
        return employee || null;
    } catch (error) {
        console.error(`Error fetching employee with id ${id}:`, error);
        return null;
    }
}

export async function createEmployee(employee: PostEmployee): Promise<{ message: string } | { error: string }> {
    try {
        console.log('Creating employee...');
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        console.log(employee)
        const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:8000/api/create-employee/', employee, { headers });
        console.log(response)
        console.log('Customer card created successfully');
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        return { error: 'Failed to create employee' };
    }
}

export async function updateEmployee(employee: Employee): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Updating employee with id ${employee.id_employee}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.post(`http://localhost:8000/api/employee/${employee.id_employee}/updateEmployee/`, employee, { headers });
        console.log('Customer card updated successfully');
        return response.data;
    } catch (error) {
        console.error(`Error updating employee with id ${employee.id_employee}:`, error);
        return { error: 'Failed to update employee' };
    }
}

export async function deleteEmployee(id: string): Promise<{ message: string } | { error: string }> {
    try {
        console.log(`Deleting employee with id ${id}...`);
        const token = await getAccessToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response: AxiosResponse<{ message: string }> = await axios.delete(`http://localhost:8000/api/delete-employee/${id}/`, { headers });
        console.log('Customer card deleted successfully');
        return response.data;
    } catch (error) {
        console.error(`Error deleting employee with id ${id}:`, error);
        return { error: 'Failed to delete employee' };
    }
}
