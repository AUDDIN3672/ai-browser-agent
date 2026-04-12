const fs = require('fs');
const path = require('path');

const TRADES_PATH = path.join(__dirname, '../data/trades.json');
const INITIAL_BALANCE = 100.0;

function loadTrades() {
    if (!fs.existsSync(TRADES_PATH)) {
        const initialData = {
            balance: INITIAL_BALANCE,
            history: [],
            activeTrades: []
        };
        fs.writeFileSync(TRADES_PATH, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    return JSON.parse(fs.readFileSync(TRADES_PATH, 'utf8'));
}

function saveTrades(data) {
    fs.writeFileSync(TRADES_PATH, JSON.stringify(data, null, 2));
}

function executeTrade(marketId, outcome, price, amount, strategyName) {
    const data = loadTrades();

    // Risk management: max 10% of balance per trade
    const maxRisk = data.balance * 0.1;
    const actualAmount = Math.min(amount, maxRisk);

    if (data.balance < actualAmount) {
        console.log('Insufficient balance for trade.');
        return false;
    }

    const trade = {
        id: Date.now().toString(),
        marketId,
        outcome,
        price,
        amount: actualAmount,
        strategy: strategyName,
        timestamp: new Date().toISOString(),
        status: 'open'
    };

    data.activeTrades.push(trade);
    data.balance -= actualAmount;
    saveTrades(data);

    console.log(`Executed trade: ${strategyName} - ${outcome} on ${marketId} at ${price} for £${actualAmount}`);
    return true;
}

function settleTrades(resolvedMarkets) {
    const data = loadTrades();
    let wins = 0;
    let losses = 0;

    const remainingTrades = [];
    for (const trade of data.activeTrades) {
        const resolution = resolvedMarkets[trade.marketId];
        if (resolution) {
            trade.status = 'closed';
            trade.resolution = resolution;

            if (resolution === trade.outcome) {
                // Win: get £1 per share (where price was share cost)
                const shares = trade.amount / trade.price;
                const payout = shares * 1.0;
                data.balance += payout;
                trade.profit = payout - trade.amount;
                trade.result = 'win';
                wins++;
            } else {
                // Loss
                trade.profit = -trade.amount;
                trade.result = 'loss';
                losses++;
            }
            data.history.push(trade);
        } else {
            remainingTrades.push(trade);
        }
    }

    data.activeTrades = remainingTrades;
    saveTrades(data);
    console.log(`Settled trades. Wins: ${wins}, Losses: ${losses}. New Balance: £${data.balance}`);
}

module.exports = { executeTrade, settleTrades, loadTrades };
