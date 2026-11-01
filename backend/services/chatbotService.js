import pinecone from "../config/pineconeConfig.js";
import Groq from "groq-sdk";
import { generateEmbedding } from "./embeddingService.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const index = pinecone.index("creditiq-cards");

export const generateChatResponse = async (message, card) => {

    // Step 1: Generate embedding for the user's question
    const embedding = await generateEmbedding(message);

    // Step 2: Search Pinecone using cardId filter
    const searchResult = await index.query({
        vector: embedding,
        topK: 5,

        filter: {
            cardId: {
                $eq: card.id.toString()
            }
        },

        includeMetadata: true
    });

    // Step 3: Extract relevant brochure text
    const matches = searchResult.matches || [];

    if (matches.length === 0) {
        return "I couldn't find relevant information about this question in the selected card's brochure.";
    }

    const context = matches
        .map(match => match.metadata?.text)
        .filter(Boolean)
        .join("\n\n");

    if (!context) {
        return "I couldn't find readable brochure information for this question.";
    }

    // Step 4: Send question + context to Groq
    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",

        messages: [
            {
                role: "system",
                content: `
You are CreditIQ's AI credit card assistant.

You answer questions about credit cards using the
provided brochure information.

Rules:
1. Answer using only the provided context.
2. Do not invent benefits, fees, eligibility criteria or conditions.
3. If information is unavailable, clearly say so.
4. Explain information in simple English.
5. Do not confuse information from different credit cards.
6. Preserve important conditions and limitations.
`
            },
            {
                role: "user",
                content: `
Credit Card: ${card.cardName}
Bank: ${card.bank}

Question:
${message}

Brochure Context:
${context}
`
            }
        ]
    });

    // Step 5: Return generated answer
    return completion.choices[0].message.content;
};