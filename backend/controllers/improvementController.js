import prisma from "../lib/prisma.js";

import {
    generateImprovementSuggestions
} from "../services/groqService.js";

export const getImprovementSuggestions = async (req, res) => {
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

        // Prepare profile for Groq
        const profile = {
            age: financialProfile.age,
            income: financialProfile.income
                ? Number(financialProfile.income)
                : null,

            occupation:
                financialProfile.occupation,

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
                financialProfile.totalMonthlyEMI
                    ? Number(financialProfile.totalMonthlyEMI)
                    : null,

            latePayments:
                financialProfile.latePayments,

            defaults:
                financialProfile.defaults,

            hasBankRelationship:
                financialProfile.hasBankRelationship
        };

        // Generate AI suggestions
        const result =
            await generateImprovementSuggestions(profile);

        return res.status(200).json({
            success: true,
            suggestions: result.suggestions
        });

    } catch (error) {
        console.error(
            "Improvement suggestions failed:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to generate improvement suggestions"
        });
    }
};