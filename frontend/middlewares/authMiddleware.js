import axios from 'axios';
import Cookies from 'js-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';


// Base URL for your Flask API
const API_BASE_URL = 'http://192.168.100.93:5000/api/v1';

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

// Register a new user
export const register = async (email, password, username) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            email,
            password,
            username
        });

        // Handle the response as needed
        if (response.data && response.data.access_token) {
            Cookies.set('access_token', response.data.access_token);
            return response.data;
        }

        return null;
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