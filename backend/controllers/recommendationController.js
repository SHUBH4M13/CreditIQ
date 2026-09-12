import {
    predictApproval,
    predictApprovalBatch
} from "../services/mlservice.js";

import prisma from "../lib/prisma.js";


//Filter module is remaning as of now the server will be fetching all the cards and giving to ML model
export const getRecommendations = async (req, res) => {
    try {
        const userId = BigInt(req.user.userId);

        // Get user's financial profile
        const financialProfile =
            await prisma.financialProfile.findUnique({
                where: {
                    userId
                }
            });

        if (!financialProfile) {
            return res.status(404).json({
                success: false,
                message: "Financial profile not found"
            });
        }

        // Get all credit cards
        const cards = await prisma.creditCard.findMany();

        if (cards.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No credit cards available"
            });
        }

        // Build ML input for every card
        const mlInputs = cards.map((card) => ({
            age: financialProfile.age,
            income: financialProfile.income,
            occupation: financialProfile.occupation,
            employmentTenureMonths:
                financialProfile.employmentTenureMonths,
            hasCreditHistory:
                financialProfile.hasCreditHistory,
            creditScore:
                financialProfile.creditScore,
            creditHistoryMonths:
                financialProfile.creditHistoryMonths,
            existingLoans:
                financialProfile.existingLoans,
            existingCreditCards:
                financialProfile.existingCreditCards,
            totalMonthlyEMI:
                financialProfile.totalMonthlyEMI,
            latePayments:
                financialProfile.latePayments,
            defaults:
                financialProfile.defaults,
            hasBankRelationship:
                financialProfile.hasBankRelationship,

            bank: card.bank,
            cardType: card.cardType,
            annualFee: card.annualFee,
            joiningFee: card.joiningFee,
            forexCharges: card.forexCharges,
            minimumIncome: card.minimumIncome,
            minimumCreditScore: card.minimumCreditScore,
            eligibilityScore: card.eligibilityScore,
            cardTier: card.cardTier
        }));

        // Get approval probabilities for all cards
        const prediction =
            await predictApprovalBatch(mlInputs);

        const probabilities =
            prediction.approval_probabilities;

        // Combine cards with predictions
        const recommendations = cards.map((card, index) => ({
            cardId: card.id.toString(),
            cardName: card.cardName,
            bank: card.bank,
            cardType: card.cardType,
            approvalProbability: probabilities[index]
        }));

        return res.status(200).json({
            success: true,
            recommendations
        });

    } catch (error) {
        console.error(
            "Recommendation failed:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to generate recommendations"
        });
    }
};


export const getApprovalProbability = async (req, res) => {
    try {
        const userId = BigInt(req.user.userId);
        const cardId = BigInt(req.body.cardId);

        // Get user's financial profile
        const financialProfile =
            await prisma.financialProfile.findUnique({
                where: {
                    userId
                }
            });

        if (!financialProfile) {
            return res.status(404).json({
                success: false,
                message: "Financial profile not found"
            });
        }

        // Get selected credit card
        const card = await prisma.creditCard.findUnique({
            where: {
                id: cardId
            }
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Credit card not found"
            });
        }

        // Build ML input
        const mlInput = {
            age: financialProfile.age,
            income: financialProfile.income,
            occupation: financialProfile.occupation,
            employmentTenureMonths:
                financialProfile.employmentTenureMonths,
            hasCreditHistory:
                financialProfile.hasCreditHistory,
            creditScore: financialProfile.creditScore,
            creditHistoryMonths:
                financialProfile.creditHistoryMonths,
            existingLoans:
                financialProfile.existingLoans,
            existingCreditCards:
                financialProfile.existingCreditCards,
            totalMonthlyEMI:
                financialProfile.totalMonthlyEMI,
            latePayments:
                financialProfile.latePayments,
            defaults:
                financialProfile.defaults,
            hasBankRelationship:
                financialProfile.hasBankRelationship,

            bank: card.bank,
            cardType: card.cardType,
            annualFee: card.annualFee,
            joiningFee: card.joiningFee,
            forexCharges: card.forexCharges,
            minimumIncome: card.minimumIncome,
            minimumCreditScore: card.minimumCreditScore,
            eligibilityScore: card.eligibilityScore,
            cardTier: card.cardTier
        };

        // Ask ML service for prediction
        const prediction = await predictApproval(mlInput);

        return res.status(200).json({
            success: true,
            cardId: card.id.toString(),
            approvalProbability:
                prediction.approval_probability
        });

    } catch (error) {
        console.error(
            "Approval prediction failed:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to calculate approval probability"
        });
    }
};