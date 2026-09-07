import prisma from "../lib/prisma.js";

export const getProfile = async (req, res) => {
    try {
        const userId = BigInt(req.user.userId);

        const profile = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
                role: true,
                financialProfile: true
            }
        });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: profile.id.toString(),
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                role: profile.role
            },
            financialProfile: profile.financialProfile
                ? {
                    ...profile.financialProfile,
                    id: profile.financialProfile.id.toString(),
                    userId: profile.financialProfile.userId.toString()
                }
                : null
        });

    } catch (error) {
        console.error("Get profile failed:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch profile"
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = BigInt(req.user.userId);

        const {
            firstName,
            lastName,
            phoneNumber,
            age,
            income,
            occupation,
            employmentStatus,
            creditScore,
            existingLoans,
            existingCreditCards,
            monthlySpending,
            spendingCategories,
            preferredBenefits
        } = req.body;

        // Update basic user information
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                firstName,
                lastName,
                phoneNumber
            }
        });

        // Create or update financial profile
        const financialProfile = await prisma.financialProfile.upsert({
            where: {
                userId
            },
            update: {
                age,
                income,
                occupation,
                employmentStatus,
                creditScore,
                existingLoans,
                existingCreditCards,
                monthlySpending,
                spendingCategories,
                preferredBenefits
            },
            create: {
                userId,
                age,
                income,
                occupation,
                employmentStatus,
                creditScore,
                existingLoans,
                existingCreditCards,
                monthlySpending,
                spendingCategories,
                preferredBenefits
            }
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser.id.toString(),
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                role: updatedUser.role
            },
            financialProfile: {
                ...financialProfile,
                id: financialProfile.id.toString(),
                userId: financialProfile.userId.toString()
            }
        });

    } catch (error) {
        console.error("Update profile failed:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update profile"
        });
    }
};