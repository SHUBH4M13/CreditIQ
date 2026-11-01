import express from "express";

import {
    chatWithAssistant
} from "../controllers/chatController.js";

import {
    authenticate
} from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    chatWithAssistant
);

export default router;