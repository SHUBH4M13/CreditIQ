import express from "express";

import {
    getApprovalProbability,
    getRecommendations
} from "../controllers/recommendationController.js";

import { authenticate } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post(
    "/approval-probability",
    authenticate,
    getApprovalProbability
);

router.get(
    "/",
    authenticate,
    getRecommendations
);

export default router;