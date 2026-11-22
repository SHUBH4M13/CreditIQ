
/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Update user profile and financial profile
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
 *                 enum:
 *                   - SALARIED_PRIVATE
 *                   - SALARIED_GOVERNMENT_PSU
 *                   - SELF_EMPLOYED_PROFESSIONAL
 *                   - SELF_EMPLOYED_BUSINESS
 *                   - UNEMPLOYED
 *                   - STUDENT
 *                   - RETIRED_PENSIONER
 *                   - NRI
 *                 example: SALARIED_PRIVATE
 *               employmentTenureMonths:
 *                 type: integer
 *                 example: 24
 *               hasCreditHistory:
 *                 type: boolean
 *                 example: true
 *               creditScore:
 *                 type: integer
 *                 example: 760
 *               creditHistoryMonths:
 *                 type: integer
 *                 example: 36
 *               existingLoans:
 *                 type: integer
 *                 example: 1
 *               existingCreditCards:
 *                 type: integer
 *                 example: 2
 *               totalMonthlyEMI:
 *                 type: number
 *                 example: 15000
 *               latePayments:
 *                 type: integer
 *                 example: 0
 *               defaults:
 *                 type: integer
 *                 example: 0
 *               hasBankRelationship:
 *                 type: boolean
 *                 example: true
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


/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     description: Retrieves the authenticated user's personal and financial profile.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: Shubham
 *                     lastName:
 *                       type: string
 *                       example: Karna
 *                     email:
 *                       type: string
 *                       example: shubham@example.com
 *                     phoneNumber:
 *                       type: string
 *                       nullable: true
 *                       example: "9876543210"
 *                     age:
 *                       type: integer
 *                       nullable: true
 *                       example: 23
 *                     income:
 *                       type: number
 *                       nullable: true
 *                       example: 600000
 *                     occupation:
 *                       type: string
 *                       nullable: true
 *                       enum:
 *                         - SALARIED_PRIVATE
 *                         - SALARIED_GOVERNMENT_PSU
 *                         - SELF_EMPLOYED_PROFESSIONAL
 *                         - SELF_EMPLOYED_BUSINESS
 *                         - UNEMPLOYED
 *                         - STUDENT
 *                         - RETIRED_PENSIONER
 *                         - NRI
 *                     employmentTenureMonths:
 *                       type: integer
 *                       nullable: true
 *                       example: 24
 *                     hasCreditHistory:
 *                       type: boolean
 *                       nullable: true
 *                       example: true
 *                     creditScore:
 *                       type: integer
 *                       nullable: true
 *                       example: 750
 *                     creditHistoryMonths:
 *                       type: integer
 *                       nullable: true
 *                       example: 36
 *                     existingLoans:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *                     existingCreditCards:
 *                       type: integer
 *                       nullable: true
 *                       example: 2
 *                     totalMonthlyEMI:
 *                       type: number
 *                       nullable: true
 *                       example: 12000
 *                     latePayments:
 *                       type: integer
 *                       nullable: true
 *                       example: 0
 *                     defaults:
 *                       type: integer
 *                       nullable: true
 *                       example: 0
 *                     hasBankRelationship:
 *                       type: boolean
 *                       nullable: true
 *                       example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User profile not found
 *       500:
 *         description: Internal server error
 */
