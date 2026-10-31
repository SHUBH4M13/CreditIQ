import express from "express";
import {
    getImprovementSuggestions
} from "../controllers/improvementController.js";
import { authenticate } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    getImprovementSuggestions
);

export default router;