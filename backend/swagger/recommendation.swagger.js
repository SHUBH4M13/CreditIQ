/**
 * @swagger
 * /api/recommendations/approval-probability:
 *   post:
 *     summary: Get credit card approval probability
 *     description: Calculates the estimated approval probability for the authenticated user and selected credit card using the CreditIQ ML model.
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardId
 *             properties:
 *               cardId:
 *                 type: string
 *                 example: "12"
 *     responses:
 *       200:
 *         description: Approval probability calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cardId:
 *                   type: string
 *                   example: "12"
 *                 approvalProbability:
 *                   type: number
 *                   format: float
 *                   example: 88.34
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Financial profile or credit card not found
 *       500:
 *         description: Unable to calculate approval probability
 */