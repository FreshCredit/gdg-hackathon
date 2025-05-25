const {
  exchangeToken,
  getIdentity,
  getBalance,
  getTransactions,
  searchInstitution,
  getInstitutions,
  publicTokenWRTInstitution
} = require('./plaidServices'); // adjust path as needed

/**
 * Replace this with a valid public_token from your Plaid Link flow.
 * In Sandbox mode, you can use the static test token:
 * 'public-sandbox-abc123...'
 */
async function runPlaidTests() {
  try {


    const PUBLIC_TOKEN = await publicTokenWRTInstitution('ins_130958')
    console.log('🔄 Exchanging public_token for access_token...');
    const tokenResponse = await exchangeToken(publicKey);
    const access_token = tokenResponse.access_token;
    console.log('✅ Access Token:', access_token);




    console.log('\n📇 Fetching identity...');
    const identity = await getIdentity(access_token);
    console.log('✅ Identity:', JSON.stringify(identity, null, 2));

    console.log('\n💰 Fetching balance...');
    const balance = await getBalance(access_token);
    console.log('✅ Balance:', JSON.stringify(balance, null, 2));

    console.log('\n📜 Fetching transactions...');
    const transactions = await getTransactions(
      access_token,
      '2025-04-01',
      '2025-05-24'
    );
    console.log('✅ Transactions:', JSON.stringify(transactions, null, 2));
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

runPlaidTests();
