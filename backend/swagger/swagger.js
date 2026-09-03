import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registerSwagger = (app, port) => {
    const swaggerSpec = swaggerJsdoc({
        definition: {
            openapi: "3.0.3",
            info: {
                title: "CreditIQ API",
                version: "1.0.0",
                description: "Interactive API documentation for the CreditIQ backend."
            },
            servers: [
                {
                    url: `http://localhost:${port}`,
                    description: "Local development server"
                }
            ]
        },
        apis: [path.join(__dirname, "*.swagger.js")]
    });

    app.get("/api-docs.json", (req, res) => {
        res.status(200).json(swaggerSpec);
    });

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            customSiteTitle: "CreditIQ API Documentation"
        })
    );
};

export default registerSwagger;
