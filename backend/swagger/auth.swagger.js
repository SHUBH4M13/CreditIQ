/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new CreditIQ user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Shubham
 *               lastName:
 *                 type: string
 *                 example: Karna
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: The request data is invalid.
 *       409:
 *         description: An account already uses this email address.
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JSON Web Token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login succeeded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid email or password.
 */
