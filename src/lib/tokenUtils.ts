import axios, { AxiosError } from 'axios';
//import { useRouter } from 'next/navigation';

export const getAccessToken = async (): Promise<string | null> => {
    //const router = useRouter();
    let token = localStorage.getItem('accessToken');

    if (!token) {
        console.error('No access token found');
        return null;
    }

    // Test if the token is still valid
    try {
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        await axios.get('http://localhost:8000/api/test-token/', { headers });
    } catch (error:any) {
        if (error.response && error.response.status === 401) {
            // Token has expired, attempt to refresh it
            console.log('Access token expired, attempting to refresh');
            token = await refreshToken();
        } else {
            console.error('Error verifying token', error);
            return null;
        }
    }

    return token;
};

const refreshToken = async (): Promise<string | null> => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken)
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
        });

        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        console.log("New accessToken saved")
        console.log(newAccessToken)
        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing token', error);
        //router.push('/login');  // Redirect to login on token refresh failure
        return null;
    }
};
