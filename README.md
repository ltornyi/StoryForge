# StoryForge

**StoryForge** is a Node.js API that transforms full-length articles into mobile-friendly story cards. Designed for content-rich applications, it helps automate the repackaging of articles into engaging visual narratives with minimal human effort.

## ✨ What It Does

StoryForge takes an article as input and returns an array of concise, structured "cards" that can be displayed in a story-like format in mobile apps.

- ✅ Smart segmentation into 4–8 cards
- ✅ First card always titled **"Top Line"**
- ✅ Last card always titled **"Bottom Line"**
- ✅ Intermediate cards may or may not have titles
- ✅ Each card has a meaningful, standalone snippet of the article

## 🛠 Tech Stack

- Node.js (ESM)
- Express.js for API routing
- Azure OpenAI API for content transformation
- dotenv for secure config management

## 🚀 Getting Started

### 1. Configure the environment

After cloning the repository, install dependencies

    npm install

Create a `.env` file in the root folder and add:

    AZURE_OPENAI_KEY=your-azure-openai-key
    AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
    AZURE_OPENAI_MODEL_NAME=your-model-name
    AZURE_OPENAI_DEPLOYMENT_NAME=your-deployment-name
    AZURE_OPENAI_API_VERSION=2024-02-15-preview

### 2. Start the server

    node index.mjs

The server runs on `http://localhost:3000` by default.

## 📡 API Usage

Endpoint

    POST /api/cards

Request body

    {
        "article": "Full text of the article goes here..."
    }

Response Format

    {
        "cards": [
            { "title": "Top Line", "body": "..." },
            { "title": "Optional Title", "body": "..." },
            ...
            { "title": "Bottom Line", "body": "..." }
        ]
    }

## 🧪 Local Testing

    curl -X POST http://localhost:3000/api/cards \
    -H "Content-Type: application/json" \
    -d '{
        "article": "Markets are navigating a complex landscape shaped by evolving monetary policy, geopolitical risks, and shifting investor sentiment. Inflation has moderated in some regions, but central banks remain cautious. Equity markets show signs of recovery, yet volatility persists. Investors are seeking clarity on interest rate paths, earnings growth, and macroeconomic stability. Diversification and a long-term view are essential in this environment. As always, aligning portfolios with fundamental trends is key."
    }'
