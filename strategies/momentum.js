/**
 * Momentum Strategy: Target markets with high 24hr volume and recent price changes.
 */
function analyze(markets) {
    const opportunities = [];
    for (const market of markets) {
        if (market.oneDayPriceChange && Math.abs(market.oneDayPriceChange) > 0.05) {
            const outcomes = JSON.parse(market.outcomes);
            const prices = JSON.parse(market.outcomePrices);

            // Buy the direction of momentum
            const outcomeIndex = market.oneDayPriceChange > 0 ? 0 : 1;

            opportunities.push({
                marketId: market.id,
                type: 'momentum',
                reason: `Strong 24hr price change of ${market.oneDayPriceChange}`,
                suggestedTrades: [{
                    outcome: outcomes[outcomeIndex],
                    price: parseFloat(prices[outcomeIndex]),
                    confidence: Math.abs(market.oneDayPriceChange) * 2
                }]
            });
        }
    }
    return opportunities;
}
module.exports = { analyze };
