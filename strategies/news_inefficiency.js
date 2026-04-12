/**
 * News Inefficiency Strategy: Matches keywords in news items with market questions.
 * If a significant news event is detected that isn't yet reflected in the price.
 */
function analyze(markets, orderBooks, news) {
    const opportunities = [];
    const newsItems = news.articles || [];

    for (const market of markets) {
        for (const article of newsItems) {
            if (market.question.toLowerCase().includes(article.title.toLowerCase().split(' ')[0])) {
                // Potential match
                opportunities.push({
                    marketId: market.id,
                    type: 'news_inefficiency',
                    reason: `News match: ${article.title}`,
                    suggestedTrades: [{
                        outcome: 'Yes',
                        price: 0.5, // Default placeholder
                        confidence: 0.6
                    }]
                });
            }
        }
    }
    return opportunities;
}
module.exports = { analyze };
