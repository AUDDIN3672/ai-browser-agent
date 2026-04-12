const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GAMMA_API_URL = 'https://gamma-api.polymarket.com';

async function fetchMarkets() {
    try {
        console.log('Fetching markets from Polymarket...');
        const response = await axios.get(`${GAMMA_API_URL}/markets`, {
            params: {
                limit: 100,
                active: true,
                closed: false
            }
        });

        const markets = response.data;
        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        const dataPath = path.join(dataDir, 'markets.json');
        fs.writeFileSync(dataPath, JSON.stringify(markets, null, 2));
        console.log(`Successfully fetched ${markets.length} markets and saved to data/markets.json`);
        return markets;
    } catch (error) {
        console.error('Error fetching markets:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

fetchMarkets();

module.exports = { fetchMarkets };
