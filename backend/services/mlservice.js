import axios from "axios";

export const predictApproval = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.ML_URL}/predict`,
            data
        );

        return response.data;

    } catch (error) {
        console.error(
            "ML service error:",
            error.response?.data || error.message
        );

        throw new Error("ML prediction service unavailable");
    }
};


export const predictApprovalBatch = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.ML_URL}/predict/batch`,
            data
        );

        return response.data;

    } catch (error) {
        console.error(
            "ML batch service error:",
            error.response?.data || error.message
        );

        throw new Error("ML prediction service unavailable");
    }
};