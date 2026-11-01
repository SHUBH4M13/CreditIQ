import prisma from "../lib/prisma.js";
import {
    generateChatResponse
} from "../services/chatbotService.js";

export const chatWithAssistant = async (req, res) => {
    try {
        const { message, cardId } = req.body;

        // Step 1: Validate request
        if (!message || !cardId) {
            return res.status(400).json({
                success: false,
                message: "Message and cardId are required"
            });
        }

        // Step 2: Validate cardId
        let id;

        try {
            if (!/^\d+$/.test(String(cardId))) {
                throw new Error("Invalid card ID");
            }

            id = BigInt(cardId);
        } catch {
            return res.status(400).json({
                success: false,
                message: "Invalid cardId"
            });
        }

        // Step 3: Fetch selected card from MySQL
        const card = await prisma.creditCard.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                cardName: true,
                bank: true
            }
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Credit card not found"
            });
        }

        // Step 4: Generate AI response
        const answer = await generateChatResponse(
            message,
            card
        );

        // Step 5: Return response
        return res.status(200).json({
            success: true,
            card: {
                cardId: card.id.toString(),
                cardName: card.cardName,
                bank: card.bank
            },
            answer
        });

    } catch (error) {
        console.error("Chat assistant error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to process your question"
        });
    }
};