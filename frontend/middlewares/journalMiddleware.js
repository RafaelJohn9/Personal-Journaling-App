import axios from 'axios';
import { API_BASE_URL } from './globals';
import { getObject, getAuthHeaders } from './authMiddleware'; // Assuming this function exists to get the access token

export const createJournal = async (title, category, content) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(`${API_BASE_URL}/journals`, {
            title,
            category,
            content,
        }, { headers });

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Failed to create journal');
        }
    } catch (error) {
        console.error('Error creating journal:', error);
        throw error;
    }
};

export const editJournal = async (id, title, category, content) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.put(`${API_BASE_URL}/journals/${id}`, {
            title,
            content,
            category,
        }, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to edit journal');
        }
    } catch (error) {
        console.error('Error editing journal:', error);
        throw error;
    }
};

export const readJournal = async (id) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_BASE_URL}/journals/${id}`, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch journal');
        }
    } catch (error) {
        console.error('Error fetching journal:', error);
        throw error;
    }
};

export const deleteJournal = async (id) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.delete(`${API_BASE_URL}/journals/${id}`, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to delete journal');
        }
    } catch (error) {
        console.error('Error deleting journal:', error);
        throw error;
    }
};

export const readAllJournals = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_BASE_URL}/journals`, { headers });

        if (response.status === 200) {
            return response.data['journals'];
        } else {
            throw new Error('Failed to fetch journals');
        }
    } catch (error) {
        console.error('Error fetching journals:', error);
        throw error;
    }
};

export const updateJournal = async (id, title, category, content) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.put(`${API_BASE_URL}/journals/${id}`, {
            title,
            content,
            category,
        }, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update journal');
        }
    } catch (error) {
        console.error('Error updating journal:', error);
        throw error;
    }
};