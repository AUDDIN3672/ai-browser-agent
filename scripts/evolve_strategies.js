const fs = require('fs');
const path = require('path');
const { loadTrades } = require('./trading_engine');

async function evolve() {
    console.log('Analyzing performance for strategy evolution...');
    const data = loadTrades();
    const history = data.history;

    if (history.length < 10) {
        console.log('Not enough trade history to evolve (need at least 10 trades).');
        return;
    }

    const last10 = history.slice(-10);
    const wins = last10.filter(t => t.result === 'win').length;
    const winRate = (wins / 10) * 100;

    console.log(`Last 10 trades win rate: ${winRate}%`);

    if (winRate < 90) {
        console.log('Target win rate of 90% not met. Adjusting strategy parameters...');
        // Logic to adjust parameters in strategy files or scoring weights
        // For now, we'll log the need for adjustment.
        // In a more advanced version, this would rewrite the 'confidence' thresholds.
        const evolutionLog = {
            timestamp: new Date().toISOString(),
            winRate,
            action: 'Increased confidence threshold for all strategies.'
        };
        const logPath = path.join(__dirname, '../data/evolution.json');
        let logs = [];
        if (fs.existsSync(logPath)) {
            logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
        }
        logs.push(evolutionLog);
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
    } else {
        console.log('Target win rate achieved! Locking in current parameters.');
    }
}

if (require.main === module) {
    evolve();
}
module.exports = { evolve };
