/**
 * @openapi
 * /:
 *   get:
 *     summary: Check whether the CreditIQ backend is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: The backend is available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: CreditIQ Backend is running
 */
