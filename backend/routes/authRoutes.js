import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/authController.js";

const router = Router();

const registerValidation = [
    body("firstName")
        .trim()
        .notEmpty().withMessage("First name is required")
        .isLength({ max: 100 }).withMessage("First name must be at most 100 characters"),
    body("lastName")
        .trim()
        .notEmpty().withMessage("Last name is required")
        .isLength({ max: 100 }).withMessage("Last name must be at most 100 characters"),
    body("email")
        .trim()
        .isEmail().withMessage("A valid email address is required")
        .normalizeEmail(),
    body("password")
        .isString().withMessage("Password must be a string")
        .isLength({ min: 8, max: 72 }).withMessage("Password must be between 8 and 72 characters")
];

const loginValidation = [
    body("email")
        .trim()
        .isEmail().withMessage("A valid email address is required")
        .normalizeEmail(),
    body("password")
        .isString().withMessage("Password must be a string")
        .notEmpty().withMessage("Password is required")
];

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
