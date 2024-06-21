// MegaverseAPI.js

const axios = require('axios');

/**
 * A class to handle API interactions with the Megaverse service.
 */
class MegaverseAPI {
    constructor(baseURL, candidateId) {
        this.baseURL = baseURL;
        this.candidateId = candidateId;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async createObject(type, data) {
        try {
            const response = await this.axiosInstance.post(`/${type}`, { ...data, candidateId: this.candidateId });
            console.log(`${type} created at (${data.row}, ${data.column}) with additional data: ${JSON.stringify(data)}`);
            return response.data;
        } catch (error) {
            console.error(`Error creating ${type} at (${data.row}, ${data.column}): ${error.message}`);
            if (error.response && error.response.status === 429) {
                console.log('Handling rate limit, retrying...');
                await new Promise(resolve => setTimeout(resolve, 3000));  // Updated delay for rate limiting
                return this.createObject(type, data);  // Retry after delay
            }
            throw error;
        }
    }

    async fetchGoalMap() {
        try {
            const response = await this.axiosInstance.get(`/map/${this.candidateId}/goal`);
            console.log('Goal map fetched successfully.');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch the goal map:', error.message);
            throw error;
        }
    }
}

module.exports = MegaverseAPI;
