const fs = require('fs');
const path = require('path');
const axios = require('axios');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


const PLAID_API_BASE_URL = process.env.PLAID_SANDBOX_API;

// Load Plaid API endpoints from plaidAPI.json
const plaidAPIPath = path.join(__dirname, './plaidAPI.json');
const plaidAPIEndpoints = JSON.parse(fs.readFileSync(plaidAPIPath, 'utf8'));

/**
 * Fetches data from Plaid API.
 * @param {string} endpointKey - Key for the endpoint in plaidAPI.json
 * @param {object} requestBody - Request body to send to Plaid API
 * @returns {Promise<object>} - Response from Plaid API
 */
async function fetchPlaidAPI(endpointKey, requestBody) {
    const config = plaidAPIEndpoints.plaid_api[endpointKey];
    if (!config || !config.endpoint) {
        throw new Error(`Endpoint "${endpointKey}" not found in plaidAPI.json`);
    }

    const url = `${PLAID_API_BASE_URL}${config.endpoint}`;
    const method = config.method || 'POST';
    console.log({url, config})
    console.log({requestBody})
    try {
        const response = await axios({
            url,
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestBody,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}


module.exports = { fetchPlaidAPI };