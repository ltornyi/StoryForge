import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.AZURE_OPENAI_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const modelName = process.env.AZURE_OPENAI_MODEL_NAME;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const options = { endpoint, apiKey, deployment, apiVersion }

import { AzureOpenAI } from "openai";
//create azure openai client
const client = new AzureOpenAI(options);

export async function generateCardsFromArticle(article) {
  const systemPrompt = `
You are a content transformation assistant helping to adapt financial articles into mobile story format.
Split the input article into 4–8 story cards.
- The first card must be called "Top Line" and summarize the story briefly.
- The last card must be called "Bottom Line" and give takeaways or conclusions.
- In between, cards may or may not have a title.
- Each card should be short, engaging, and clearly reflect one aspect of the article. A card body contain up to 6 sentences.
Return an array of cards in this JSON format:

[
  { "title": "Top Line", "body": "..." },
  { "title": "Optional title", "body": "..." },
  ...
  { "title": "Bottom Line", "body": "..." }
]
`;

  const userPrompt = `Here is the article:\n\n${article}`;

  const completion = await client.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: 4096,
    temperature: 1,
    top_p: 1,
    model: modelName,
    response_format: {type: "json_object"},
  });

  const message = completion.choices[0].message;

  if (message.refusal) {
    console.log('Story generation was refused', message.refusal);
    return {}
  } else {
    console.log('Story generation succeeded');
    try {
        const parsed = JSON.parse(message.content);
        return parsed;
    } catch (err) {
        console.error('Failed to parse JSON from model response:', err);
        throw new Error('LLM returned invalid JSON');
    }
  }

}
