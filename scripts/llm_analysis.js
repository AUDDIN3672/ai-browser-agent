const axios = require('axios');

async function analyzeWithOllama(market, news) {
    try {
        console.log(`Analyzing market: ${market.question} with Ollama...`);
        // Note: This expects Ollama to be running on localhost:11434
        // In GitHub Actions, we'll need to start Ollama in the workflow.
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'phi3',
            prompt: `Market: ${market.question}
Description: ${market.description}
Latest News: ${JSON.stringify(news).substring(0, 1000)}

Analyze this market and suggest if I should buy "Yes" or "No".
Return only a JSON object like {"recommendation": "Yes", "confidence": 0.8, "reason": "..."}`,
            stream: false,
            format: 'json'
        });

        return JSON.parse(response.data.response);
    } catch (error) {
        console.error('Ollama analysis failed:', error.message);
        return null;
    }
}

module.exports = { analyzeWithOllama };
