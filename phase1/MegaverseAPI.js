// phase1/MegaverseAPI.js

const axios = require('axios');

/**
 * A class to interact with the Megaverse API to create and manage celestial objects.
 */
class MegaverseAPI {
    constructor(baseURL, candidateId) {
        this.baseURL = baseURL;
        this.candidateId = candidateId;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: {'Content-Type': 'application/json'}
        });
    }

    /**
     * Creates a celestial object with retries and exponential backoff in case of rate limits.
     * @param {string} type - The type of celestial object (e.g., 'polyanets').
     * @param {object} data - The data including row and column for the object placement.
     * @param {number} retries - Number of retries in case of failure.
     * @param {number} delay - Initial delay for the backoff.
     * @returns {Promise} - The result of the API call.
     */
    async createObject(type, data, retries = 5, delay = 500) {
        try {
            const response = await this.axiosInstance.post(`/${type}`, {...data, candidateId: this.candidateId});
            console.log(`${type} created at (${data.row}, ${data.column})`);
            return response.data;
        } catch (error) {
            if (retries > 0 && error.response && error.response.status === 429) {
                console.log(`Rate limit exceeded, retrying in ${delay}ms...`);
                await new Promise(r => setTimeout(r, delay));
                return this.createObject(type, data, retries - 1, delay * 2); // Exponential backoff
            } else {
                console.error(`Error creating ${type} at (${data.row}, ${data.column}): ${error.message}`);
                throw error;  // Re-throw the error if not a rate limit issue or no retries left
            }
        }
    }
}

module.exports = MegaverseAPI;
