import express from "express";
import prisma from "./lib/prisma.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cardRoutes from "./routes/cardRoutes.js"
import recommendationRoutes from "./routes/recommendationRoutes.js"

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";

const app = express();
const PORT = Number(process.env.PORT || 5001);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/recommendations" , recommendationRoutes)

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CreditIQ Backend is running"
    });
});

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Prisma database connected");
        console.log(`http://localhost:${PORT}/api-docs/#/`)
    } catch (error) {
        console.error(`Prisma database connection failed: ${error.message}`);
        console.error("The API is running, but database-dependent endpoints will be unavailable until MySQL is reachable.");
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();