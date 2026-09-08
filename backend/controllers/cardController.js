import prisma from "../lib/prisma.js";
import { validationResult } from "express-validator";

const getValidationErrors = (req) =>
    validationResult(req).array().map(({ path, msg }) => ({
        field: path,
        message: msg
    }));

const formatCard = (card) => ({
    ...card,
    id: card.id.toString()
});

export const createCard = async (req, res) => {


    const validationErrors = getValidationErrors(req);

    if (validationErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationErrors
        });
    }

    try {
        const card = await prisma.creditCard.create({
            data: req.body
        });

        return res.status(201).json({
            success: true,
            message: "Credit card created successfully",
            card: formatCard(card)
        });

    } catch (error) {

        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "This credit card already exists"
            });
        }

        console.error("Create card failed:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create credit card"
        });
    }
};

export const getAllCards = async (req, res) => {
    try {
        // Pagination
        const page = Math.max(parseInt(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(parseInt(req.query.limit) || 10, 1),
            100
        );

        const skip = (page - 1) * limit;

        // Search
        const search = req.query.search?.trim() || "";

        // Filters + Sorting
        const {
            bank,
            cardType,
            maxAnnualFee,
            maxJoiningFee,
            minIncome,
            minCreditScore,
            sortBy,
            order
        } = req.query;

        // Build Prisma WHERE condition
        const where = {};

        // Search by bank OR card name
        if (search) {
            where.OR = [
                {
                    bank: {
                        contains: search
                    }
                },
                {
                    cardName: {
                        contains: search
                    }
                }
            ];
        }

        // Bank filter
        if (bank) {
            where.bank = bank;
        }

        // Card type filter
        if (cardType) {
            where.cardType = cardType;
        }

        // Maximum annual fee
        if (maxAnnualFee !== undefined) {
            where.annualFee = {
                lte: Number(maxAnnualFee)
            };
        }

        // Maximum joining fee
        if (maxJoiningFee !== undefined) {
            where.joiningFee = {
                lte: Number(maxJoiningFee)
            };
        }

        // Minimum income requirement
        if (minIncome !== undefined) {
            where.minimumIncome = {
                lte: Number(minIncome)
            };
        }

        // Minimum credit score requirement
        if (minCreditScore !== undefined) {
            where.minimumCreditScore = {
                lte: Number(minCreditScore)
            };
        }

        // Allowed sorting fields
        const allowedSortFields = [
            "annualFee",
            "joiningFee",
            "minimumIncome",
            "minimumCreditScore",
            "forexCharges",
            "createdAt"
        ];

        const sortField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";

        const sortOrder = order === "asc" ? "asc" : "desc";

        // Fetch cards + total count
        const [cards, totalCards] = await Promise.all([
            prisma.creditCard.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    [sortField]: sortOrder
                }
            }),

            prisma.creditCard.count({
                where
            })
        ]);

        // Calculate total pages
        const totalPages = Math.ceil(totalCards / limit);

        return res.status(200).json({
            success: true,
            cards: cards.map(formatCard),
            pagination: {
                page,
                limit,
                totalCards,
                totalPages
            }
        });

    } catch (error) {
        console.error("Get cards failed:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch credit cards"
        });
    }
};

export const getCardById = async (req, res) => {
    try {
        const card = await prisma.creditCard.findUnique({
            where: {
                id: BigInt(req.params.id)
            }
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Credit card not found"
            });
        }

        return res.status(200).json({
            success: true,
            card: formatCard(card)
        });
    } catch (error) {
        console.error("Get card failed:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch credit card"
        });
    }
};

export const updateCard = async (req, res) => {

    const validationErrors = getValidationErrors(req);

    if (validationErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationErrors
        });
    }

    try {
        const card = await prisma.creditCard.update({
            where: {
                id: BigInt(req.params.id)
            },
            data: req.body
        });

        return res.status(200).json({
            success: true,
            message: "Credit card updated successfully",
            card: formatCard(card)
        });
    } catch (error) {
        console.error("Update card failed:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update credit card"
        });
    }
};

export const deleteCard = async (req, res) => {
    try {
        await prisma.creditCard.delete({
            where: {
                id: BigInt(req.params.id)
            }
        });

        return res.status(200).json({
            success: true,
            message: "Credit card deleted successfully"
        });
    } catch (error) {
        console.error("Delete card failed:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to delete credit card"
        });
    }
};