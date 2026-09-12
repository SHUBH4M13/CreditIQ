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

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Get personalized credit card recommendations
 *     description: |
 *       Returns the top recommended credit cards for the authenticated user.
 *       The user's financial profile is obtained from the JWT token.
 *       The system evaluates candidate cards using approval probability
 *       and compatibility scoring.
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Personalized credit card recommendations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cardId:
 *                         type: string
 *                         example: "12"
 *                       cardName:
 *                         type: string
 *                         example: "HDFC Regalia Gold"
 *                       bank:
 *                         type: string
 *                         example: "HDFC_BANK"
 *                       cardType:
 *                         type: string
 *                         example: "TRAVEL"
 *                       approvalProbability:
 *                         type: number
 *                         format: float
 *                         example: 88.34
 *                       compatibilityScore:
 *                         type: number
 *                         format: float
 *                         example: 82.50
 *                       recommendationScore:
 *                         type: number
 *                         format: float
 *                         example: 85.42
 *                       explanation:
 *                         type: string
 *                         example: "High approval probability and good eligibility match."
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Financial profile not found
 *       500:
 *         description: Unable to generate recommendations
 */