import express from "express";
import connectDB from "./config/ConnectDB.js";
import registerSwagger from "./swagger/swagger.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
registerSwagger(app, PORT);

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CreditIQ Backend is running"
    });
});

// Start server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`CreditIQ Server running on port ${PORT}`);
    });
};

startServer();
