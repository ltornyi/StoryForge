import express from 'express';
import { generateCardsFromArticle } from './cardGenerator.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

app.post('/api/cards', async (req, res) => {
  const { article } = req.body;

  if (!article || typeof article !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing article text' });
  }

  try {
    const cards = await generateCardsFromArticle(article);
    res.json({ cards });
  } catch (error) {
    console.error('Card generation failed:', error);
    res.status(500).json({ error: 'Failed to generate cards' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
