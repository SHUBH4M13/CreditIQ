import { body } from "express-validator";

export const createCardValidator = [
    body("bank")
        .trim()
        .notEmpty()
        .withMessage("Bank is required")
        .isLength({ max: 100 })
        .withMessage("Bank name must not exceed 100 characters"),

    body("cardName")
        .trim()
        .notEmpty()
        .withMessage("Card name is required")
        .isLength({ max: 150 })
        .withMessage("Card name must not exceed 150 characters"),

    body("cardType")
        .trim()
        .notEmpty()
        .withMessage("Card type is required")
        .isLength({ max: 50 })
        .withMessage("Card type must not exceed 50 characters"),

    body("annualFee")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Annual fee must be a non-negative number"),

    body("joiningFee")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Joining fee must be a non-negative number"),

    body("rewards")
        .optional()
        .isString()
        .withMessage("Rewards must be a string"),

    body("cashback")
        .optional()
        .isString()
        .withMessage("Cashback must be a string"),

    body("loungeAccess")
        .optional()
        .isString()
        .withMessage("Lounge access must be a string"),

    body("forexCharges")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Forex charges must be a non-negative number"),

    body("minimumIncome")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum income must be a non-negative number"),

    body("minimumCreditScore")
        .optional()
        .isInt({ min: 300, max: 900 })
        .withMessage("Minimum credit score must be between 300 and 900"),

    body("benefits")
        .optional()
        .isObject()
        .withMessage("Benefits must be an object"),

    body("brochureUrl")
        .optional()
        .isURL()
        .withMessage("Brochure URL must be a valid URL"),

    body("sourceUrl")
        .optional()
        .isURL()
        .withMessage("Source URL must be a valid URL")
];

export const updateCardValidator = [
    body("bank")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Bank name must not exceed 100 characters"),

    body("cardName")
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage("Card name must not exceed 150 characters"),

    body("cardType")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Card type must not exceed 50 characters"),

    body("annualFee")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Annual fee must be a non-negative number"),

    body("joiningFee")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Joining fee must be a non-negative number"),

    body("rewards")
        .optional()
        .isString()
        .withMessage("Rewards must be a string"),

    body("cashback")
        .optional()
        .isString()
        .withMessage("Cashback must be a string"),

    body("loungeAccess")
        .optional()
        .isString()
        .withMessage("Lounge access must be a string"),

    body("forexCharges")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Forex charges must be a non-negative number"),

    body("minimumIncome")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum income must be a non-negative number"),

    body("minimumCreditScore")
        .optional()
        .isInt({ min: 300, max: 900 })
        .withMessage("Minimum credit score must be between 300 and 900"),

    body("benefits")
        .optional()
        .isObject()
        .withMessage("Benefits must be an object"),

    body("brochureUrl")
        .optional()
        .isURL()
        .withMessage("Brochure URL must be a valid URL"),

    body("sourceUrl")
        .optional()
        .isURL()
        .withMessage("Source URL must be a valid URL")
];