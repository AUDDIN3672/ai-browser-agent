/**
 * Arbitrage Strategy: Focus on price inefficiencies where the total probability
 * of all outcomes doesn't add up to 100%.
 */
function analyze(markets, orderBooks) {
    const opportunities = [];
    for (const market of markets) {
        if (!market.outcomePrices) continue;

        const prices = JSON.parse(market.outcomePrices).map(p => parseFloat(p));
        const sum = prices.reduce((a, b) => a + b, 0);

        // If sum is significantly less than 1.0, there's a mispricing inefficiency.
        if (sum < 0.98) {
            opportunities.push({
                marketId: market.id,
                type: 'arbitrage',
                reason: `Total probability is ${sum}, indicating mispricing.`,
                suggestedTrades: prices.map((p, i) => ({
                    outcome: JSON.parse(market.outcomes)[i],
                    price: p,
                    confidence: 1.0 - sum
                }))
            });
        }
    }
    return opportunities;
}
module.exports = { analyze };
