import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "CreditIQ API",
            version: "1.0.0",
            description: "Backend API for CreditIQ"
        },

        servers: [
            {
                url: "http://localhost:5001",
                description: "Local development server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        "./routes/*.js",
        "./swagger/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;