const { analyzeWithOllama } = require('../scripts/llm_analysis');

async function analyze(markets, orderBooks, news) {
    const opportunities = [];
    // Limit to top 2 high volume markets to avoid overloading Ollama
    const topMarkets = [...markets]
        .sort((a, b) => b.volumeNum - a.volumeNum)
        .slice(0, 2);

    for (const market of topMarkets) {
        const result = await analyzeWithOllama(market, news);
        if (result && result.confidence > 0.7) {
            const outcomes = JSON.parse(market.outcomes);
            const prices = JSON.parse(market.outcomePrices);
            const outcomeIndex = outcomes.indexOf(result.recommendation);

            if (outcomeIndex !== -1) {
                opportunities.push({
                    marketId: market.id,
                    type: 'llm_analysis',
                    reason: result.reason,
                    suggestedTrades: [{
                        outcome: result.recommendation,
                        price: parseFloat(prices[outcomeIndex]),
                        confidence: result.confidence
                    }]
                });
            }
        }
    }
    return opportunities;
}
module.exports = { analyze };
