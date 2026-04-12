const { fetchMarkets } = require('./fetch_markets');
const { fetchAllOrderBooks } = require('./fetch_orderbook');
const { fetchNews } = require('./fetch_news');
const { runAll } = require('./run_strategies');
const { evolve } = require('./evolve_strategies');

async function main() {
    console.log('--- Starting Bot Execution ---');
    try {
        await fetchMarkets();
        await fetchAllOrderBooks();
        await fetchNews();
        await runAll();
        await evolve();
    } catch (err) {
        console.error('Bot execution failed:', err);
    }
    console.log('--- Bot Execution Complete ---');
}

main();
