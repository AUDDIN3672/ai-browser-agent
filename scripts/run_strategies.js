const fs = require('fs');
const path = require('path');
const { executeTrade } = require('./trading_engine');

async function runAll() {
    const markets = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/markets.json'), 'utf8'));
    const orderBooks = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/orderbooks.json'), 'utf8'));
    const news = fs.existsSync(path.join(__dirname, '../data/news.json')) ?
        JSON.parse(fs.readFileSync(path.join(__dirname, '../data/news.json'), 'utf8')) : {};

    const strategyFiles = fs.readdirSync(path.join(__dirname, '../strategies'));
    let allOpportunities = [];

    for (const file of strategyFiles) {
        if (!file.endsWith('.js')) continue;
        console.log(`Running strategy: ${file}`);
        const strategy = require(path.join(__dirname, '../strategies', file));
        try {
            const opps = await strategy.analyze(markets, orderBooks, news);
            if (opps && Array.isArray(opps)) {
                allOpportunities = allOpportunities.concat(opps);
            }
        } catch (err) {
            console.error(`Error running strategy ${file}:`, err.message);
        }
    }

    // Execute best opportunities
    allOpportunities.sort((a, b) => {
        const confA = a.suggestedTrades[0]?.confidence || 0;
        const confB = b.suggestedTrades[0]?.confidence || 0;
        return confB - confA;
    });

    console.log(`Found ${allOpportunities.length} opportunities. Executing top 3...`);

    for (const opp of allOpportunities.slice(0, 3)) {
        const trade = opp.suggestedTrades[0];
        if (trade) {
            executeTrade(opp.marketId, trade.outcome, trade.price, 10.0, opp.type);
        }
    }
}

if (require.main === module) {
    runAll();
}
module.exports = { runAll };
