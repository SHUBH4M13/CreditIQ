import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const SALT_ROUNDS = 12;

const toPublicUser = (user) => ({
    id: user.id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

const getValidationErrors = (req) => validationResult(req).array()
    .map(({ path, msg }) => ({ field: path, message: msg }));

export const register = async (req, res) => {
    const validationErrors = getValidationErrors(req);

    if (validationErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationErrors
        });
    }

    const { firstName, lastName, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: { id: true }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email: normalizedEmail,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: toPublicUser(user)
        });
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists"
            });
        }

        console.error("User registration failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to register user"
        });
    }
};

export const login = async (req, res) => {
    const validationErrors = getValidationErrors(req);

    if (validationErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationErrors
        });
    }

    if (!process.env.JWT_SECRET) {
        console.error("Login is unavailable: JWT_SECRET is not configured");
        return res.status(500).json({
            success: false,
            message: "Authentication is not configured"
        });
    }

    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: { id: true, password: true, role: true }
        });

        const passwordMatches = user && await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { userId: user.id.toString(), email: user.email , role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.error("User login failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to log in"
        });
    }
};
