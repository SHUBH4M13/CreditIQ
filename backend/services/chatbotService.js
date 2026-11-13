import axios from "axios";

export const generateChatResponse = async (message, card) => {
    try {
        const response = await axios.post(
            `${process.env.ML_URL}/chat`,
            {
                card_id: card.id.toString(),
                card_name: card.cardName,
                bank: card.bank,
                message
            }
        );

        return response.data.answer;

    } catch (error) {
        console.error(
            "Chatbot service error:",
            error.response?.data || error.message
        );

        throw new Error("Unable to generate chatbot response");
    }
};
