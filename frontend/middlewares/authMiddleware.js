import axios from 'axios';
import Cookies from 'js-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from './globals';


/**
 * Checks if a user is logged in
 * @returns {Promise<boolean>} - Returns true if the user is logged in, false otherwise
 */
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


/**
 * Authentication Headers needed for authenticated users
 * @returns {Promise<Object>} - Returns an object with the authentication headers
 * @throws {Error} - Throws an error if no access token is found
 */
export const getAuthHeaders = async () => {
    const token = await getObject('access_token');
    if (!token) {
        throw new Error('No access token found');
    }
    return { 'Cookie': `access_token=${token}` };
};


/**
 * Function to store an object in AsyncStorage
 * @param {string} key - The key under which the object will be stored
 * @param {Object} value - The object to store
 * @returns {Promise<void>}
 */
export const storeObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error('Error storing object in AsyncStorage:', error);
    }
};


/**
 * Function to retrieve an object from AsyncStorage
 * @param {string} key - The key of the object to retrieve
 * @returns {Promise<Object|null>} - Returns the retrieved object or null if not found
 */
export const getObject = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? value : null;
    } catch (error) {
        console.error('Error retrieving object from AsyncStorage:', error);
        return null;
    }
};

/**
 * Requests OTP for user approval
 * @param {string} email - The email of the user
 * @returns {Promise<Object>} - Returns the OTP data
 * @throws {Error} - Throws an error if the request fails
 */
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


/**
 * OTP verification
 * @param {string} otp - The OTP to verify
 * @param {string} email - The email of the user
 * @returns {Promise<Object>} - Returns the response from the OTP verification endpoint
 * @throws {Error} - Throws an error if OTP verification fails
 */
export const otpVerification = async (otp, email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/verify_otp`, { otp, email });

        // Check if the response status is 200
        if (response.status === 200) {

            // Check if access_token_cookie exists in the response headers
            const accessTokenCookie = response.headers['set-cookie'][0];
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


/**
 * Registers a new user
 * @param {string} password - The password for the new user
 * @returns {Promise<boolean>} - Returns true if registration is successful, false otherwise
 * @throws {Error} - Throws an error if registration fails
 */
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



/**
 * Logs in a user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {Promise<Object>} - Returns a message indicating login success
 * @throws {Error} - Throws an error if login fails
 */
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


/**
 * Logs out a user
 * @returns {Promise<boolean>} - Returns true if logout is successful, false otherwise
 * @throws {Error} - Throws an error if logout fails
 */
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


/**
 * Updates a user's password
 * @param {string} email - The email of the user
 * @param {string} newPassword - The new password for the user
 * @returns {Promise<Object>} - Returns the response from the update password endpoint
 * @throws {Error} - Throws an error if updating the password fails
 */
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


/**
 * Checks if a user exists
 * @param {string} email - The email of the user
 * @returns {Promise<Object>} - Returns an object indicating if the user exists and a message
 * @throws {Error} - Throws an error if checking if the user exists fails
 */
export const userExists = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/check_user_exists`, {
            email
        });

        // Handle the response as needed
        if (response.status === 200) {
            return { exists: true, message: 'User exists' };
        } else {
            // For any status code other than 200, treat it as an error
            throw new Error('Failed to check if user exists');
        }
    } catch (error) {
        // Check specifically for a 404 error
        if (error.response && error.response.status === 404) {
            return { exists: false, message: 'User does not exist' };
        } else {
            console.error('Error checking if user exists:', error);
            throw error;
        }
    }
};

