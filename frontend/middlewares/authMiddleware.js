import axios from 'axios';
import Cookies from 'js-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from './globals';

// checks if a user is logged in
export const isLoggedIn = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('access_token');

        if (!accessToken) {
            return false; // No access token found, user is not logged in
        }

        // Decode the JWT to get the payload
        const decodedToken = jwtDecode(accessToken);

        // Check if the token is expired by comparing the current time with the token's expiry time
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
        const tokenExpiry = decodedToken.exp;

        // Return true if the token is not expired, false otherwise
        return tokenExpiry > currentTime;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false; // Return false in case of any errors
    }
};

//  Authentication Headers needed for authenticated users
export const getAuthHeaders = async () => {
    const token = await getObject('access_token');
    if (!token) {
        throw new Error('No access token found');
    }
    return { 'Cookie': `access_token=${token}` };
};

// Function to store an object from AsyncStorage
export const storeObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error('Error storing object in AsyncStorage:', error);
    }
};

// Function to retrieve an object from AsyncStorage
export const getObject = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? value : null;
    } catch (error) {
        console.error('Error retrieving object from AsyncStorage:', error);
        return null;
    }
};

// requests OTP for user approval
export const requestOtp = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/send_otp`, { email });

        // response contains the OTP data
        return response.data;
    } catch (error) {
        console.error('Error querying OTP endpoint:', error);
        throw error;
    }
};


// OTP verification returns response
export const otpVerification = async (otp, email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/verify_otp`, { otp, email });

        // Check if the response status is 200
        if (response.status === 200) {

            // Check if access_token_cookie exists in the response headers
            const accessTokenCookie = response.headers['set-cookie'][0];
            console.error(accessTokenCookie)
            if (accessTokenCookie) {
                // Extract the access_token from the cookie string
                const accessToken = accessTokenCookie.split(';')[0].split('=')[1];
                // Set the access_token in cookies
                await AsyncStorage.setItem('access_token', accessToken);
            }
            return response;
        } else if (response.status === 400) {
            return response;
        } else {
            throw new Error('OTP verification failed');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};


// Register a new user
export const register = async (password) => {
    const { email, username } = JSON.parse(await getObject('user')); // Parsify the json string to become an object
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            email,
            password,
            username
        });

        // Handle the response as needed
        if (response.status === 201) {
            // automatically logins a user after successful registration
            await login(email, password)

            return true;
        }

        return false;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};


// Login a user
export const login = async (email, password) => {
    try {
        // Perform login API call to obtain access token
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

        // Store access token in AsyncStorage
        // Check if access_token_cookie exists in the response headers
        const accessTokenCookie = response.headers['set-cookie'][0];

        if (accessTokenCookie) {
            // Extract the access_token from the cookie string
            const accessToken = accessTokenCookie.split(';')[0].split('=')[1];
            // Set the access_token in cookies
            await AsyncStorage.setItem('access_token', accessToken);
            return { message: 'Login successful' };
        } else {
            throw new Error('Access token cookie not found in response.');
        }

    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// logout
export const logout = async () => {
    try {
        const headers = await getAuthHeaders();
        await AsyncStorage.removeItem('access_token');
        const response = await axios.post(`${API_BASE_URL}/logout`, {}, { headers });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async (email, newPassword) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(`${API_BASE_URL}/update_password`, {
            email,
            new_password: newPassword
        },
            { headers });

        // Handle the response as needed
        if (response.status === 200) {
            await login(email, newPassword)
            return response;
        } else {
            throw new Error('Failed to update password');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

export const userExists = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/check_user_exists`, {
            email
        });

        // Handle the response as needed
        if (response.status === 200) {
            return { exists: true, message: 'User exists' };
        } else if (response.status === 404) {
            return { exists: false, message: 'User does not exist' };
        } else {
            throw new Error('Failed to check if user exists');
        }
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
};

