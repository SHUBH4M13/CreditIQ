import express from "express";
import { authenticate } from "../middleware/AuthMiddleware.js";
import { authorizeAdmin } from "../middleware/roleMiddleware.js";
import {
    createCard,
    getAllCards,
    getCardById,
    updateCard,
    deleteCard
} from "../controllers/cardController.js";;

import {
    createCardValidator,
    updateCardValidator
} from "../validators/cardValidator.js";

const router = express.Router();


// Public routes
router.get("/", getAllCards);
router.get("/:id", getCardById);

// Admin routes
router.post("/", authenticate, authorizeAdmin, createCardValidator ,createCard);
router.put("/:id", authenticate, authorizeAdmin, updateCardValidator , updateCard);
router.delete("/:id", authenticate, authorizeAdmin, deleteCard);

export default router;