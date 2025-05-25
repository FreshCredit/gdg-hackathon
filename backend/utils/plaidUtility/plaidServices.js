const { fetchPlaidAPI } = require('./PlainutilityAPI');
const path = require('path');
const axios = require('axios');


require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


const client_id = process.env.PLAID_CLIENT_ID;
const secret = process.env.PLAID_SECRET;



async function publicTokenWRTInstitution(institution_id) {
  const requestBody = {
        client_id,
        secret,
        institution_id,
        initial_products: ['transactions']
    };
    return fetchPlaidAPI('publicTokenWRTInstitution', requestBody);
}


async function getIdentity(access_token) {
    const requestBody = {
        client_id,
        secret,
        access_token,
    };
    return fetchPlaidAPI('identity', requestBody);
}




async function getInstitutions() {
        const requestBody = {
        client_id,
        secret,
        count: 10, 
        offset: 0,
        country_codes: ['US']
    };
    return fetchPlaidAPI('getInstitutions', requestBody);
}


async function getBalance(access_token) {
    const requestBody = {
        client_id,
        secret,
        access_token,
    };
    return fetchPlaidAPI('balance', requestBody);
}

async function getTransactions(access_token, start_date, end_date) {
    const requestBody = {
        client_id,
        secret,
        access_token,
        start_date,
        end_date,
        options: {
            count: 100,
            offset: 0,
        },
    };
    return fetchPlaidAPI('transactions', requestBody);
}

module.exports = {
    exchangeToken,
    getIdentity,
    getBalance,
    getTransactions,
    publicTokenWRTInstitution,
    getInstitutions
};

