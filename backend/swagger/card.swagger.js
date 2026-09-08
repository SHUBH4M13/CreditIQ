/**
 * @swagger
 * tags:
 *   name: Credit Cards
 *   description: Credit card catalog APIs
 */

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all credit cards
 *     tags: [Credit Cards]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of cards per page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by bank name or card name
 *
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *         description: Filter by bank
 *
 *       - in: query
 *         name: cardType
 *         schema:
 *           type: string
 *         description: Filter by card type
 *
 *       - in: query
 *         name: maxAnnualFee
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Maximum annual fee
 *
 *       - in: query
 *         name: maxJoiningFee
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Maximum joining fee
 *
 *       - in: query
 *         name: minIncome
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: User's income used to filter cards
 *
 *       - in: query
 *         name: minCreditScore
 *         schema:
 *           type: integer
 *           minimum: 300
 *           maximum: 900
 *         description: User's credit score used to filter cards
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - annualFee
 *             - joiningFee
 *             - minimumIncome
 *             - minimumCreditScore
 *             - forexCharges
 *             - createdAt
 *         description: Field to sort by
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *         description: Sort order
 *
 *     responses:
 *       200:
 *         description: List of credit cards
 *       500:
 *         description: Unable to fetch credit cards
 *
 *   post:
 *     summary: Create a new credit card
 *     tags: [Credit Cards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bank
 *               - cardName
 *               - cardType
 *             properties:
 *               bank:
 *                 type: string
 *                 example: HDFC Bank
 *               cardName:
 *                 type: string
 *                 example: HDFC Millennia Credit Card
 *               cardType:
 *                 type: string
 *                 example: Cashback
 *               annualFee:
 *                 type: number
 *                 example: 1000
 *               joiningFee:
 *                 type: number
 *                 example: 1000
 *               rewards:
 *                 type: string
 *                 example: 5 reward points per ₹150 spent
 *               cashback:
 *                 type: string
 *                 example: Up to 5% cashback
 *               loungeAccess:
 *                 type: string
 *                 example: 8 domestic lounge visits per year
 *               forexCharges:
 *                 type: number
 *                 example: 3.5
 *               minimumIncome:
 *                 type: number
 *                 example: 35000
 *               minimumCreditScore:
 *                 type: integer
 *                 example: 750
 *               benefits:
 *                 type: object
 *                 example:
 *                   fuelSurchargeWaiver: "1%"
 *                   insurance: "Included"
 *               brochureUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/brochure.pdf
 *               sourceUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/card
 *     responses:
 *       201:
 *         description: Credit card created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       409:
 *         description: Credit card already exists
 *       500:
 *         description: Unable to create credit card
 */

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Get a credit card by ID
 *     tags: [Credit Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Credit card ID
 *     responses:
 *       200:
 *         description: Credit card found
 *       404:
 *         description: Credit card not found
 *       500:
 *         description: Unable to fetch credit card
 *
 *   put:
 *     summary: Update a credit card
 *     tags: [Credit Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Credit card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank:
 *                 type: string
 *                 example: HDFC Bank
 *               cardName:
 *                 type: string
 *                 example: HDFC Millennia Credit Card
 *               cardType:
 *                 type: string
 *                 example: Cashback
 *               annualFee:
 *                 type: number
 *                 example: 1500
 *               joiningFee:
 *                 type: number
 *                 example: 1500
 *               rewards:
 *                 type: string
 *               cashback:
 *                 type: string
 *               loungeAccess:
 *                 type: string
 *               forexCharges:
 *                 type: number
 *               minimumIncome:
 *                 type: number
 *               minimumCreditScore:
 *                 type: integer
 *               benefits:
 *                 type: object
 *               brochureUrl:
 *                 type: string
 *                 format: uri
 *               sourceUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Credit card updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Credit card not found
 *       409:
 *         description: Credit card already exists
 *       500:
 *         description: Unable to update credit card
 *
 *   delete:
 *     summary: Delete a credit card
 *     tags: [Credit Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Credit card ID
 *     responses:
 *       200:
 *         description: Credit card deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Credit card not found
 *       500:
 *         description: Unable to delete credit card
 */