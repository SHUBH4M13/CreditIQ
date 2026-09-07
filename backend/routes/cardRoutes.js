import express from "express";
import { authenticate } from "../middleware/AuthMiddleware.js";
import { authorizeAdmin } from "../middleware/roleMiddleware.js";
//import { createCard } from "../controllers/cardController.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorizeAdmin,
    createCard
);

export default router;