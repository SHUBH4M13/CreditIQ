import express from "express";
import { getApprovalProbability } from "../controllers/recommendationController.js";
import { authenticate } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post(
    "/approval-probability",
    authenticate,
    getApprovalProbability
);

export default router;