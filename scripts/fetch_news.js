const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchNews() {
    try {
        console.log('Fetching news...');
        // Using a free RSS-to-JSON API or a public news API for demo.
        // For actual use, the user can add an API key for NewsAPI.org or similar.
        const response = await axios.get('https://ok.surf/api/v1/cors/news-feed');

        const newsData = response.data;
        const newsPath = path.join(__dirname, '../data/news.json');
        fs.writeFileSync(newsPath, JSON.stringify(newsData, null, 2));
        console.log('Successfully fetched news and saved to data/news.json');
        return newsData;
    } catch (error) {
        console.error('Error fetching news:', error.message);
        // Fallback or empty data
        return {};
    }
}

if (require.main === module) {
    fetchNews();
}

module.exports = { fetchNews };
