import { predictApproval } from "../services/mlservice.js";
import prisma from "../lib/prisma.js";


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