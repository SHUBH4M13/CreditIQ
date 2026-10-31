import axios from "axios";

export const generateEmbedding = async (text) => {
    try {
        const response = await axios.post(
            `${process.env.ML_URL}/embed`,
            {
                text
            }
        );

        return response.data.embedding;

    } catch (error) {
        console.error(
            "Embedding service error:",
            error.response?.data || error.message
        );

        throw new Error("Embedding service unavailable");
    }
};