const axios = require('axios');
const fs = require('fs');
const path = require('path');

const CLOB_API_URL = 'https://clob.polymarket.com';

async function fetchOrderBook(tokenId) {
    try {
        console.log(`Fetching order book for token: ${tokenId}...`);
        const response = await axios.get(`${CLOB_API_URL}/book`, {
            params: {
                token_id: tokenId
            }
        });

        return response.data;
    } catch (error) {
        console.error(`Error fetching order book for ${tokenId}:`, error.message);
        return null;
    }
}

async function fetchAllOrderBooks() {
    const marketsPath = path.join(__dirname, '../data/markets.json');
    if (!fs.existsSync(marketsPath)) {
        console.error('markets.json not found. Run fetch_markets.js first.');
        return;
    }

    const markets = JSON.parse(fs.readFileSync(marketsPath, 'utf8'));
    const orderBooks = {};

    // Limit to first 5 markets for testing to avoid rate limits
    const testMarkets = markets.slice(0, 5);

    for (const market of testMarkets) {
        const tokenIds = JSON.parse(market.clobTokenIds);
        orderBooks[market.id] = {};
        for (const tokenId of tokenIds) {
            const book = await fetchOrderBook(tokenId);
            if (book) {
                orderBooks[market.id][tokenId] = book;
            }
            // Small delay to be nice to the API
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    const orderBooksPath = path.join(__dirname, '../data/orderbooks.json');
    fs.writeFileSync(orderBooksPath, JSON.stringify(orderBooks, null, 2));
    console.log(`Saved order books for ${testMarkets.length} markets to data/orderbooks.json`);
}

if (require.main === module) {
    fetchAllOrderBooks();
}

module.exports = { fetchOrderBook, fetchAllOrderBooks };
