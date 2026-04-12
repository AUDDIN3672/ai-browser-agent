/**
 * Volume Strategy: Target markets with the highest liquidity and volume,
 * as they are less likely to have massive price manipulation.
 */
function analyze(markets) {
    const sorted = [...markets].sort((a, b) => b.volumeNum - a.volumeNum);
    const opportunities = [];
    for (const market of sorted.slice(0, 5)) {
        const outcomes = JSON.parse(market.outcomes);
        const prices = JSON.parse(market.outcomePrices);
        opportunities.push({
            marketId: market.id,
            type: 'volume',
            reason: `High volume market: ${market.volumeNum}`,
            suggestedTrades: [{
                outcome: outcomes[0],
                price: parseFloat(prices[0]),
                confidence: 0.5
            }]
        });
    }
    return opportunities;
}
module.exports = { analyze };
