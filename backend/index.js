import express from "express";
import prisma from "./lib/prisma.js";
import registerSwagger from "./swagger/swagger.js";

const app = express();
const PORT = Number(process.env.PORT || 5001);

app.use(express.json());
registerSwagger(app);

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
    } catch (error) {
        console.error(`Prisma database connection failed: ${error.message}`);
        console.error("The API is running, but database-dependent endpoints will be unavailable until MySQL is reachable.");
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();