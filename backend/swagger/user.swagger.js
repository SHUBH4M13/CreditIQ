/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User profile management
 */

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Authentication required or token is invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Unable to fetch profile
 */

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Shubham
 *               lastName:
 *                 type: string
 *                 example: Karna
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               age:
 *                 type: integer
 *                 example: 22
 *               income:
 *                 type: number
 *                 example: 800000
 *               occupation:
 *                 type: string
 *                 example: Software Engineer
 *               employmentStatus:
 *                 type: string
 *                 example: EMPLOYED
 *               creditScore:
 *                 type: integer
 *                 example: 760
 *               existingLoans:
 *                 type: integer
 *                 example: 1
 *               existingCreditCards:
 *                 type: integer
 *                 example: 2
 *               monthlySpending:
 *                 type: number
 *                 example: 30000
 *               spendingCategories:
 *                 type: object
 *                 example:
 *                   shopping: 10000
 *                   food: 5000
 *                   travel: 7000
 *                   fuel: 3000
 *                   bills: 5000
 *               preferredBenefits:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - cashback
 *                   - travel
 *                   - airport_lounge
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Authentication required or token is invalid
 *       500:
 *         description: Unable to update profile
 */