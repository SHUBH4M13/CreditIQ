import pinecone from "../config/pinecone.js";

const indexName = "creditiq-cards";

const existingIndexes = await pinecone.listIndexes();

const exists = existingIndexes.indexes?.some(
    (index) => index.name === indexName
);

if (!exists) {
    await pinecone.createIndex({
        name: indexName,
        dimension: 384,
        metric: "cosine",
        spec: {
            serverless: {
                cloud: "aws",
                region: "us-east-1"
            }
        }
    });

    console.log("Pinecone index created:", indexName);
} else {
    console.log("Pinecone index already exists:", indexName);
}