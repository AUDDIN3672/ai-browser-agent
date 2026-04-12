const { fetchMarkets } = require('./fetch_markets');
const { fetchAllOrderBooks } = require('./fetch_orderbook');
const { fetchNews } = require('./fetch_news');

async function main() {
    console.log('Starting full data fetch...');
    await fetchMarkets();
    await fetchAllOrderBooks();
    await fetchNews();
    console.log('Full data fetch complete.');
}

if (require.main === module) {
    main();
}
