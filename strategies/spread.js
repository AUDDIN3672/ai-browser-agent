/**
 * Spread Strategy: Look for markets with narrow spreads indicating high efficiency
 * or wide spreads indicating potential mispricing.
 */
function analyze(markets) {
    const opportunities = [];
    for (const market of markets) {
        if (market.spread > 0.05) {
            const outcomes = JSON.parse(market.outcomes);
            const prices = JSON.parse(market.outcomePrices);
            opportunities.push({
                marketId: market.id,
                type: 'spread',
                reason: `Wide spread of ${market.spread} indicates potential mispricing.`,
                suggestedTrades: [{
                    outcome: outcomes[0],
                    price: parseFloat(prices[0]),
                    confidence: market.spread
                }]
            });
        }
    }
    return opportunities;
}
module.exports = { analyze };
